import Big from 'big.js';
import Regs from './regs'
import symbol from './symbol';

export interface mulFunc {
    (equation: string): string
}

const mul: mulFunc = (equation: string) => {
    let equa = symbol(equation); //先做一次负负得正负正得负的运算
    if (equa.match(Regs.mul)) {
        return mul(
            equa.replace(Regs.mul, (match, index, origin) => {
                let _arr = match.split('*');
                return (
                    Big(
                        _arr[0]
                    )
                    .times(
                        Big(
                            _arr[1]
                        )
                    )
                    .toPrecision()
                )
            })
        )
    } else {
        return equa
    }
}

export default mul