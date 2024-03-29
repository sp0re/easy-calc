// const index = require("../src/index")
// const calc = index.default

const calc = require('../dist/calc-easy.min.js');
const createCalc = calc.createCalc;

test('0.1 + 0.2', ()=>{
    expect(calc('0.1 + 0.2')).toBe('0.3')
})

test('0.7 + 0.1', ()=>{
    expect(calc('0.7 + 0.1')).toBe('0.8')
})

test('0.3 - 0.2', ()=>{
    expect(calc('0.3 - 0.2')).toBe('0.1')
})

test('1.5 - 1.2', ()=>{
    expect(calc('1.5 - 1.2')).toBe('0.3')
})

test('0.1 * 0.2', ()=>{
    expect(calc('0.1 * 0.2')).toBe('0.02')
})

test('19.9 * 100', ()=>{
    expect(calc('19.9 * 100')).toBe('1990')
})

test('(19.9*100 + 0.1*100)/100', ()=>{
    expect(calc('(19.9*100 + 0.1*100)/100')).toBe('20')
})

test('0.3 / 0.1', ()=>{
    expect(calc('0.3 / 0.1')).toBe('3')
})

test('0.1', ()=>{
    expect(calc('0.1')).toBe('0.1')
})

test('9007199254740992 + 1', ()=>{
    expect(calc('9007199254740992 + 1')).toBe('9007199254740993')
})

test('9007199254740992 + 1 + 0.355 toFixed: 2', ()=>{
    expect(calc('9007199254740992 + 1 + 0.355', {toFixed:2})).toBe('9007199254740993.36')
})

test('9007199254740992 + 3', ()=>{
    expect(calc('9007199254740992 + 3')).toBe('9007199254740995')
})

test('9007199254740992.1 + 0.2', ()=>{
    expect(calc('9007199254740992.1 + 0.2')).toBe('9007199254740992.3')
})

test('9007199254740992', ()=>{
    expect(calc('9007199254740992')).toBe('9007199254740992')
})

test('9007199254740993', ()=>{
    expect(calc('9007199254740993')).toBe('9007199254740993')
})

test('9007199254740993 + 9007199254740992', ()=>{
    expect(calc('9007199254740993 + 9007199254740992')).toBe('18014398509481985')
})

test('9007199254740993 + 9007199254740992 + 2/3*3', ()=>{
    expect(calc('9007199254740993 + 9007199254740992 + 2/3*3')).toBe('18014398509481987')
})

test('-(9007199254740993 + 9007199254740992)', ()=>{
    expect(calc('-(9007199254740993 + 9007199254740992)')).toBe('-18014398509481985')
})

test('-(9007199254740993 + 2)', ()=>{
    expect(calc('-(9007199254740993 + 2)')).toBe('-9007199254740995')
})

test('9007199254740993.toFixed(4)', ()=>{
    expect(calc('9007199254740993', {toFixed:4})).toBe('9007199254740993.0000')
})

test('1.335.toFixed(2)', ()=>{
    expect(calc('1.335', {toFixed:2})).toBe('1.34')
})

test('0.355.toFixed(2)', ()=>{
    expect(calc('0.355', {toFixed:2})).toBe('0.36')
})

test('(0.1*100 + 0.2*100)/100', ()=>{
    expect(calc('(0.1*100 + 0.2*100)/100')).toBe('0.3')
})

test('-(0.1*10 + 0.2*10)/10', ()=>{
    expect(calc('-(0.1*10 + 0.2*10)/10')).toBe('-0.3')
})

test('(35.41*100*100)/100', ()=>{
    expect(calc('(35.41*100*100)/100')).toBe('3541')
})

test('(100% + 2/(4-1))*3-2*2', ()=>{
    expect(calc('(100% + 2/(4-1))*3-2*2')).toMatch(/1/)
})

test('( good1 *   3+good2*2- 10%)*(8 /10%)', ()=>{
    expect(calc('( good1 *   3+good2*2- 10%)*(8 /10%)', {
        variable: {
          good1: 100.5678,
          good2: '-200',
        },
        toFixed: 10
      })).toBe('-7871.7280000000')
})

const data = {
    goodA: 12.99,
    goodB: 3.8,
    coupon: 10,
    discount: 8
}

test('(A * 3 + B * 2 - C) * (D / 10)', ()=>{
    expect(calc('(A * 3 + B * 2 - C) * (D / 10)', {
        variable: {
            A: data.goodA,  //12.99
            B: data.goodB,  //3.8
            C: data.coupon,  //10
            D: data.discount //8
        },
        toFixed: 2
    })).toBe('29.26')
})

test('-1*-2*-3 + -2 * 3', ()=>{
    expect(calc('-1*-2*-3 + -2 * 3')).toBe('-12')
})

test('-1*-2*-3/-4.000', ()=>{
    expect(calc('-1*-2*-3/-4.000')).toBe('1.5')
})

test('1*2*-3/-4.000', ()=>{
    expect(calc('1*2*-3/-4.000')).toBe('1.5')
})

test('-1*1*-3/-4.000', ()=>{
    expect(calc('-1*1*-3/-4.000')).toBe('-0.75')
})

test('1*+1', ()=>{
    expect(calc('1*+1')).toBe('1')
})

test('1*+1*+1', ()=>{
    expect(calc('1*+1*+1')).toBe('1')
})

test('1*+1*+1*-1', ()=>{
    expect(calc('1*+1*+1*-1')).toBe('-1')
})

test('((2+3)/10+2*(3-4))*2/-2', ()=>{
    expect(calc('((2+3)/10+2*(3-4))*2/-2')).toBe('1.5')
})

test('2/3*3', ()=>{
    expect(calc('2/3*3')).toBe('2')
})

test('3*2/3', ()=>{
    expect(calc('3*2/3')).toBe('2')
})

test('6/7*7', ()=>{
    expect(calc('6/7*7')).toBe('6')
})

test('0.1 + 12.34%', ()=>{
    expect(calc('0.1 + 12.34%')).toBe('0.2234')
})

test('2/3*3+0.1+0.2', ()=>{
    expect(calc('2/3*3+0.1+0.2')).toBe('2.3')
})

test('1/3*3 + 9007199254740992', ()=>{
    expect(calc('1/3*3 + 9007199254740992')).toBe('9007199254740993')
})

test('-(1+2/(4-1))*3-2*2 ', ()=>{
    expect(calc('-(1+2/(4-1))*3-2*2 ')).toBe('-9')
})

test('2/(4-1)*3-2*2', ()=>{
    expect(calc('2/(4-1)*3-2*2')).toBe('-2')
})

test('(100.5678*3+-200*2-10/100)*(8/10/100)', ()=>{
    expect(calc('(100.5678*3+-200*2-10/100)*(8/10/100)')).toBe('-0.7871728')
})

test('空config{}', ()=>{
    expect(calc('0.1*+0.2', {})).toBe('0.02')
})

test('空variable{}', ()=>{
    expect(calc('0.1*+0.2', {variable:{}})).toBe('0.02')
})

test('空toFixed{}', ()=>{
    expect(calc('0.1*+0.2', {toFixed:null})).toBe('0.02')
})

test('完整{}', ()=>{
    expect(calc('0.1*a+0.2/b*(c-3)', {toFixed:2, variable: {a: 1, b: '2', c:'3'}})).toBe('0.10')
})

test('es6字符串', ()=>{
    expect(calc(`0.1*${1}+0.2/${'2'}*(${3}-3)`)).toBe('0.1')
})

test('空config[]', ()=>{
    expect(calc('0.1*+0.2', [])).toBe('0.02')
})

test('空variable[]1', ()=>{
    expect(calc('0.1*+0.2', [null, 4])).toBe('0.0200')
})

test('空variable[]2', ()=>{
    expect(calc('0.1*+0.2', [{}, 4])).toBe('0.0200')
})

test('空toFixed[]', ()=>{
    expect(calc('0.1*a+0.2', [{a: 0.01}])).toBe('0.201')
})

test('完整[]', ()=>{
    expect(calc('0.1*a+0.2/b*(c-3)', [{a: 1, b: '2', c:'3'}, 2])).toBe('0.10')
})

test('验证变量替换bug1', ()=>{
    expect(calc('good+good2', [{good: -1, good2: 2}])).toBe('1')
})

test('验证变量替换bug2', ()=>{
    expect(calc('goodgood+good', [{good: -1, goodgood: 6}])).toBe('5')
})

// test('xxx', ()=>{
//     expect(calc('xxx')).toBe('xxx')
// })