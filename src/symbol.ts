// import Big from 'big.js';
import Regs from './regs'

export interface symbolFunc {
    (equation: string): string
}

const symbol: symbolFunc = (equation: string) => {    
    let equa = equation;
    if(equa.match(Regs.symbol)) {
        equa = equa.replace(Regs.addsub, (match, index, origin) => {
            return '-'
        });
        equa = equa.replace(Regs.subsub, (match, index, origin) => {
            return '+'
        });
        equa = equa.replace(Regs.addadd, (match, index, origin) => {
            return '+'
        });
        equa = equa.replace(Regs.subadd, (match, index, origin) => {
            return '-'
        });                
        return symbol(equa)
    }else{
        return equa
    }
}

export default symbol