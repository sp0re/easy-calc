const index = require("../src/index")
const createCalc = index.createCalc


test('空config{}', ()=>{
	let calc = createCalc({});
    expect(calc('0.1*+0.2')).toBe('0.02')
})

test('空variable{}', ()=>{
	let calc = createCalc({variable:{}});
    expect(calc('0.1*+0.2')).toBe('0.02')
})

test('空toFixed{}', ()=>{
	let calc = createCalc({toFixed:null});
    expect(calc('0.1*+0.2')).toBe('0.02')
})

test('完整{}', ()=>{
	let calc = createCalc({toFixed:2, variable: {a: 1, b: '2', c:'3'}});
    expect(calc('0.1*a+0.2/b*(c-3)')).toBe('0.10')
})


test('空config[]', ()=>{
	let calc = createCalc([]);
    expect(calc('0.1*+0.2')).toBe('0.02')
})

test('空variable[]1', ()=>{
	let calc = createCalc([null, 4]);
    expect(calc('0.1*+0.2')).toBe('0.0200')
})

test('空variable[]2', ()=>{
	let calc = createCalc([{}, 4]);
    expect(calc('0.1*+0.2')).toBe('0.0200')
})

test('空toFixed[]', ()=>{
	let calc = createCalc([{a: 0.01}]);
    expect(calc('0.1*a+0.2')).toBe('0.201')
})

test('完整[]', ()=>{
	let calc = createCalc([{a: 1, b: '2', c:'3'}, 2]);
    expect(calc('0.1*a+0.2/b*(c-3)')).toBe('0.10')
})

//config覆盖
test('variable{}覆盖variable{}', ()=>{
	let calc = createCalc({variable: {a: -1}});
    expect(calc('-a/3*b', {variable:{a: -2, b: 6}})).toBe('4')
})

test('variable{}覆盖variable[]', ()=>{
	let calc = createCalc([{a: -1}]);
    expect(calc('-a/3*b', {variable:{a: -2, b: 6}})).toBe('4')
})

test('variable[]覆盖variable[]', ()=>{
	let calc = createCalc([{a: -1}]);
    expect(calc('-a/3*b', [{a: -2, b: 6}])).toBe('4')
})

test('variable[]覆盖variable{}', ()=>{
	let calc = createCalc({variable: {a: -1}});
    expect(calc('-a/3*b', [{a: -2, b: 6}])).toBe('4')
})

test('toFixed{}覆盖toFixed{}', ()=>{
	let calc = createCalc({variable: {a: -1}, toFixed: 1});
    expect(calc('-a/3*b', {variable:{a: -2, b: 6}, toFixed: 2})).toBe('4.00')
})

test('toFixed[]覆盖toFixed[]', ()=>{
	let calc = createCalc([{a: -1}, 1]);
    expect(calc('-a/3*b', [{a: -2, b: 6}, 2])).toBe('4.00')
})

test('toFixed{}覆盖toFixed[]', ()=>{
	let calc = createCalc([{a: -1}, 1]);
    expect(calc('-a/3*b', {variable:{a: -2, b: 6}, toFixed: 2})).toBe('4.00')
})

test('toFixed[]覆盖toFixed{}', ()=>{
	let calc = createCalc({variable: {a: -1}, toFixed: 1});
    expect(calc('-a/3*b', [{a: -2, b: 6}, 2])).toBe('4.00')
})

test('toFixed[]覆盖空{}', ()=>{
	let calc = createCalc({variable: {a: -1}});
    expect(calc('-a/3*b', [{a: -2, b: 6}, 2])).toBe('4.00')
})

test('toFixed{}覆盖空[]', ()=>{
	let calc = createCalc([{a: -1}]);
    expect(calc('-a/3*b', {variable:{a: -2, b: 6}, toFixed: 2})).toBe('4.00')
})

// test('xxx', ()=>{
//     expect(calc('xxx')).toBe('xxx')
// })