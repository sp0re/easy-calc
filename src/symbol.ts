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
    }else if(equa.match(Regs.positive)){
        return symbol(
            equa.replace(Regs.positive, (match, index, origin)=>{
                return match.slice(0, 1) + match.slice(2);
            })
        )        
    }else{
        return equa
    }
}

export default symbol