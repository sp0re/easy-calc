export interface RegsType {
    [RegsName: string]: any
}
const Regs: RegsType = {
    mul: /\d+\.?\d*\*(\-|\+)?\d+\.?\d*/g,  //乘法，带乘数正负号
    div: /\d+\.?\d*\/(\-|\+)?\d+\.?\d*/g,  //除法，带除数正负号
    addOrSub: /((^\-)|)\d+\.?\d*(\+|\-)\d+\.?\d*/,   //加法或者减法
    addsub: /\+\-/g,
    subsub: /\-\-/g,
    addadd: /\+\+/g,
    subadd: /\-\+/g,
    symbol: /(\+|\-){2,}/g,
    space: /\s+/g,
    addSymbol: /^\+/,
    brackets: /\((\+|\-|\*|\/|\%|\w|\.)+\)/g,
    percent: /(\w|\.)+\%/g,
    positive: /\D\+\d+\.?\d*/g
}

export default Regs