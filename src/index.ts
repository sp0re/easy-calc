import Regs from './regs'
import percent from './percent'
import div from './div'
import mul from './mul'
import addAndSub from './add_sub'
import Big from 'big.js';

export interface equationConfig {
    toFixed?: number,
    variable?: {
        [variableName: string]: number | string
    }
}

export interface calcFunc {
    (
        equation: string,
        config?: equationConfig
    ): string
}

const calc: calcFunc = (equation: string, { toFixed, variable = {} }: equationConfig = {}) => {
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

    return String(
        Big(
            equa
        )
        .toNumber()
    )
}

export default calc
export {calc}