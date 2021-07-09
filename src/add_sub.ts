import Big from 'big.js';
import Regs from './regs'
import symbol from './symbol';

export interface Func {
    (equation: string): string
}

const func: Func = (equation: string) => {
    let equa = symbol(equation); //先做一次负负得正负正得负的运算
    if (equa.match(Regs.addOrSub)) {
        return func(
            equa.replace(Regs.addOrSub, (match, index, origin) => {
                let _arr = match.split('+');
                let flag = 0;
                if (_arr.length <= 1) {
                    _arr = match.split('-');
                    if (_arr.length > 2) {
                        //第一个数是负数时把符号还给数字
                        _arr.shift()
                        _arr[0] = '-' + _arr[0]
                    }
                    flag = 1;
                }
                if (flag === 0) {
                    return (
                        Big(
                            // Number(_arr[0])
                            _arr[0]
                        ).plus(
                            // Number(_arr[1])
                            _arr[1]
                        )
                        .toPrecision()
                    )
                }
                if (flag === 1) {
                    return (
                        Big(
                            // Number(_arr[0])
                            _arr[0]
                        ).minus(
                            // Number(_arr[1])
                            _arr[1]
                        )
                        .toPrecision()
                    )
                }
            })
        )
    } else {
        return equa
    }
}

export default func