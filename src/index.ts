import Regs from './regs'
import percent from './percent'
import div from './div'
import mul from './mul'
import addAndSub from './add_sub'
import Big from 'big.js';

export type toFixed = number
export type variable = {
    [variableName: string]: number | string
}

export interface equationConfig1 {
    toFixed?: toFixed,
    variable?: variable
}

export type equationConfig2 = [
    variable | null,
    toFixed | void
] | [
    variable | null
]

export type config = equationConfig1 | equationConfig2

export interface calcFunc {
    (
        equation: string,
        config?: config
    ): string
}

export interface createFunc {
    (config: config): calcFunc
}

const NUMBER_MAX:number = 9007199254740992;

const calc: calcFunc = (equation: string, config: config) => {
    let { variable, toFixed } = transConfig(config);
    let equa = equation;
    //清除空格
    equa = equa.replace(Regs.space, '')
    //变量替换
    if (variable && Object.keys(variable).length > 0) {
    // if (variable && JSON.stringify(variable) !== '{}') {
        for (let key in variable) {
            let value = variable[key];
            equa = equa.replace(new RegExp(key, 'g'), String(value))
        }
    }

    //把百分号转成除法        
    equa = percent(equa)    

    const doCalc: any = (equa: string) => {            
        //先处理除法
        equa = div(equa)
        //计算乘法
        equa = mul(equa)
        //从前到后把加减法运算算出来
        equa = addAndSub(equa)
        //最后如果前面有+号就去掉
        equa = equa.replace(Regs.addSymbol, '')

        return equa
    }

    //处理括号
    const loop: any = (equa: string) => {
        if(equa.match(Regs.brackets)){            
            return loop(
                equa.replace(Regs.brackets, (match, index, origin) => {
                    let _match = match.slice(1, match.length-1);
                    return doCalc(_match)                    
                })
            )
        }else{
            return doCalc(equa)
        }   
    }     

    equa = loop(equa)

    //tofixed
    if (toFixed || toFixed === 0) {
        return (
            Big(
                equa
            )
            .toFixed(toFixed)
        )
    }

    let handleResult:any = (equa: string) => {
        let index:number = Math.floor(Math.abs(Big(equa).div(Big(NUMBER_MAX)).toNumber())); //向下取整，得到NUMBER_MAX出现的倍数
        if(index === 0) { //没超过大数临界值，这样写能解决2/3*3会不等于2的问题
            return String(
                Big(equa).toNumber()
            )
        }else{  //超过大数临界值，先把临界值的倍数剔除，按上面的方法处理余下部分保证精度，然后把成倍的大数加回去
            let _symbol:string = Big(equa).lt(0) ? '-' : '';
            let part:string = Big(equa).abs().minus(Big(NUMBER_MAX).times(index)).toPrecision();
            let result:string = Big(NUMBER_MAX).times(index).plus(
                Big(String(
                    Big(part).toNumber()
                ))).toPrecision()
            return _symbol + result
        }
    }

    return handleResult(equa)
}

const createCalc:createFunc = (config:config) => {
    let O = {
        config: config,
        calc: (equation: string, config:config)=>{
            return calc(equation, {
                ...transConfig(O.config),
                ...transConfig(config)
            })
        }
    }
    return O.calc
}

function transConfig(config:config) : equationConfig1  {
    if(Array.isArray(config)) {
        return {
            ...( config[0] ? { variable: config[0] } : {}),
            ...( config[1] || config[1] === 0 ? { toFixed: config[1] } : {})
        }
    }else if( config && (config.variable || config.toFixed || config.toFixed === 0) ){
        return {
            ...( config.variable && Object.keys(config.variable).length > 0 ? { variable: config.variable } : {}),
            ...( config.toFixed || config.toFixed === 0 ? { toFixed: config.toFixed } : {})
        }
    }
    return {}
}

export default calc
export {createCalc}