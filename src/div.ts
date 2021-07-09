import Big from 'big.js';
import Regs from './regs'
import symbol from './symbol';

export interface divFunc {
    (equation: string): string
}

const div: divFunc = (equation: string) => {
    let equa = symbol(equation); //先做一次负负得正负正得负的运算
    if (equa.match(Regs.div)) {
        return div(
            equa.replace(Regs.div, (match, index, origin) => {
                let _arr = match.split('/');
                return (
                    _arr[0] + '*' + 
                        Big(1)
                        .div(
                            Big(
                                // Number(_arr[1])
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

export default div