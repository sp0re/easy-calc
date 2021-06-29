import mmm from './ttt';

const test = (bb:number) => {
    let aa:number = 12345
    console.log(aa+bb+20000000)
    // return mmm(String(bb))
    return new Promise((res, rej)=>{
        res(mmm(String(bb)))
    })
}

export default test
