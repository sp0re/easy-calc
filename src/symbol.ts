// import Big from 'big.js';
import Regs from './regs'

export interface symbolFunc {
    (equation: string): string
}

const symbol: symbolFunc = (equation: string) => {    
    let equa = equation;
    if(equa.match(Regs.symbol)) {
        equa = equa.replace(Regs.addsub, '-');
        equa = equa.replace(Regs.subsub, '+');
        equa = equa.replace(Regs.addadd, '+');
        equa = equa.replace(Regs.subadd, '-');                
        return symbol(equa)
    }else{
        return equa
    }
}

export default symbol