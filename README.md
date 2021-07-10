# calc-easy
**一个用法简单的、解决JavaScript基本运算与四舍五入时精度丢失问题的方法**


## 开发背景：
本人曾经被以下场景深深支配过：
```javascript
0.1 + 0.2
//结果：0.30000000000000004
0.1 * 0.2
//结果：0.020000000000000004
```
或者：
```javascript
(0.355).toFixed(2)
//结果：0.35
(1.335).toFixed(2)
//结果：1.33
```
啊啊啊啊啊啊啊啊，我只想安安静静地写点普通业务躺平混工资，上天为什么要找这些数学运算来折磨我？

直到我发现了 [decimal.js](https://www.npmjs.com/package/decimal.js) 和 [big.js](https://www.npmjs.com/package/big.js) ，这两个库是同一个作者开发的，他（们）真是太棒了，开发出那么优秀的库，几乎解决了前端数学运算会遇到的所有问题。

不过，大多数场景里我只是需要加减乘除和四舍五入这些基本运算，用不到 [decimal.js](https://www.npmjs.com/package/decimal.js) 里那么多方法；算式比较长时， [decimal.js](https://www.npmjs.com/package/decimal.js) 需要反复调用方法计算，比较繁琐，虽然支持链式调用，但链式调用毕竟不如数学算式来得直观；而且查英文文档对我这个英语负四级水平的普通前端来说也是十八层地狱级别的折磨，于是……

## 功能简介：
于是写了 **calc-easy** 这个方法。 **calc-easy** 基于 [big.js](https://www.npmjs.com/package/big.js) ，用法简单，支持正负整数和正负小数的加减乘除括号运算，支持公式变量替换，支持四舍五入，支持TS，支持IE11，没了（目前为止）。
```javascript
/* 基本使用 */
calc('0.1 + 0.2')
//结果：0.3  (就很棒
```

## 安装使用：
**安装**
```shell
npm install calc-easy --save
```
**使用**
```javascript
import calc from 'calc-easy';

let result = calc('(1+2/(4-1))*3-2*2');
console.log( "结果：" + result )
//结果：1
```


不过通常真实的**业务场景**可能是这样的：

电商平台开发，读取接口拿到购物车数据，根据数据算出当前总价。
```javascript
//需求：用户买了3个商品A(12.99元)、2个商品B（3.8元），优惠券立减10元，然后享受平台活动总价打8折，求出当前总价并保留两位小数。
//伪代码实现：
import calc from 'calc-easy';

let data = await query(API.getCarData);
let total = calc('(goodA * 3 + goodB * 2 - coupon) * (discount / 10)', {
	variable: {
		goodA: data.goodA,  //12.99
		goodB: data.goodB,  //3.8
		coupon: data.coupon,  //10
		discount: data.discount， //8
	},
	toFixed: 2
})
console.log( "总价：" + total + "元" )
//总价：29.26元
```

## API:
calc-easy只产出一个calc函数，函数有两个入参：

入参（按顺序）          | 类型      | 是否必填              | 默认值
----------        | -----              | ------            | ------------
算式，可以是单纯数学算式，也可以带变量，带变量时需要在下面配置项配置variable；支持加减乘除括号基本运算            | string       | 是   |  无
配置项，具体见下            | JSON对象    |否       | {}

配置项：

参数          | 类型       | 简介    | 默认值
----------        | -----      | -----              | ------------
toFixed            | number      | 四舍五入到多少位小数，不配置则不进行四舍五入运算      |  无
variable            | JSON对象， { [string]: number \| string }   | 配置数据，用于算式中的变量替换    | {}

## TODO:
- 支持百分号运算
- 增加校验，处理各种边界问题，处理错误异常
- 优化非ESM模块系统的场景的调用
- 优化精简代码
- 压缩产出，要小，再小，比小更小