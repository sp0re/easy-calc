import Regs from './regs'
import div from './div'
import mul from './mul'
import addAndSub from './add_sub'

export interface equationConfig {
    toFixed?: number,
    variable?: {
        [variableName: string]: any
    }
}

export interface calcFunc {
    (
        equation: string,
        config?: equationConfig
    ): string
}

const calc: calcFunc = (equation: string, {toFixed, variable={}}: equationConfig = {}) => {    
    let equa = equation;
    //清除空格
    equa = equa.replace(Regs.space, '')
    //变量替换
    if(variable && Object.keys(variable).length > 0) {
        for (let key in variable) {
            let value = variable[key];
            equa = equa.replace(new RegExp(key, 'g'), value)
        }
    }    
    //先处理除法
    equa = div(equa)
    //计算乘法
    equa = mul(equa)
    //从前到后把加减法运算算出来
    equa = addAndSub(equa)

    return equa
}

export default calc