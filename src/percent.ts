import Regs from './regs'

export interface func {
    (equation: string): string
}

const percent: func = (equation: string) => {
    let equa = equation;
    if (equa.match(Regs.percent)) {
        return percent(
            equa.replace(Regs.percent, (match, index, origin) => {
                return "(" + match.split('%')[0] + "/100)"
            })
        )
    } else {
        return equa
    }
}

export default percent