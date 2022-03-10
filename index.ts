//@ts-nocheck
const O = require('./src/index');
// module.exports = calc.default;
const calc = O.default;
calc.createCalc = O.createCalc;

module.exports = calc;