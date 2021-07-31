# calc-easy
**一个简单好用的、精度不丢失的基本运算库**


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

直到我发现了 [decimal.js](https://www.npmjs.com/package/decimal.js) ，这是个很棒的库，几乎解决了前端数学运算会遇到的所有问题。

**不过：**
- 大多数场景里我只需使用加、减、乘、除、百分号、括号和四舍五入这些基本运算，用不到 [decimal.js](https://www.npmjs.com/package/decimal.js) 里那么多方法；
- 算式比较长时， [decimal.js](https://www.npmjs.com/package/decimal.js) 需要反复调用函数进行计算，比较繁琐；
- 有些库虽然支持链式调用，但链式调用毕竟不如数学算式来得直观；
- 而且每次使用都去查英文文档，对我这个英语负四级水平的普通前端来说也是十八层地狱级别的折磨，于是有了**calc-easy**的构想。

```javascript
//伪代码演示对于数学运算来说并不太直观的链式调用：
//1+2+3+4*5-6：
new num(1).add(2).add(3).add(new num(4).plus(5)).sub(6)
//而我认为理想的使用方法：
calc('1+2+3+4*5-6')
```

## 功能简介：
**calc-easy** 基于 [big.js](https://www.npmjs.com/package/big.js) （可以勉强理解为是 [decimal.js](https://www.npmjs.com/package/decimal.js) 的小兄弟，再次感谢），用法简单直观，支持正负整数和正负小数的加、减、乘、除、百分号和括号运算，支持公式变量替换，支持四舍五入，支持TS，支持IE11。
```javascript
/* 基本使用 */
calc('0.1 + 0.2')
//结果：0.3  (就很棒
calc('1+2+3+4*5-6')
//结果：20
```

## 安装使用：
**安装**
```shell
npm install calc-easy --save
```
**使用**

ES module:
```javascript
import calc from 'calc-easy';

let result = calc('(1+2/(4-1))*3-2*2');
console.log( "结果：" + result )
//结果：1
```
CommonJS:
```javascript
const calc = require('calc-easy');

let result = calc('(100% + 2/(4-1))*3-2*2');
console.log( "结果：" + result )
//结果：1
```

同时支持浏览器端和Node.js端使用。

或者您也可以选择用 **script 标签** 引入：
```html
<script src='https://unpkg.com/calc-easy@0.0.5/dist/calc-easy.min.js'></script>
```
```javascript
var result = calcEasy('(1+2/(4-1))*3-2*2');
console.log( "结果：" + result )
//结果：1
```

=============

**业务场景举例：**

开发一个电商平台，需要读取接口拿到购物车数据，然后根据数据算出当前总价。
```javascript
//需求：用户买了3个商品A(12.99元)、2个商品B（3.8元），优惠券立减10元，然后享受平台活动总价打8折，求出当前总价并保留两位小数。
//伪代码实现：
import calc from 'calc-easy';

let data = await query(API.getCarData);
let total = calc('(A * 3 + B * 2 - C) * (D / 10)', {
	variable: {
		A: data.goodA,  //12.99
		B: data.goodB,  //3.8
		C: data.coupon,  //10
		D: data.discount， //8
	},
	toFixed: 2
})
console.log( "总价：" + total + "元" )
//总价：29.26元
```

## API:
calc-easy目前只产出一个calc函数，函数有两个入参：

入参（按顺序）          | 类型      | 是否必填              | 默认值
----------        | -----              | ------            | ------------
算式，可以是单纯数学算式，也可以带变量，带变量时需要在下面配置项配置variable；支持加、减、乘、除、百分号和括号的基本运算            | string       | 是   |  无
配置项，具体见下            | JSON对象    |否       | {}

配置项：

参数          | 类型       | 简介    | 默认值
----------        | -----      | -----              | ------------
toFixed            | number      | 四舍五入到多少位小数，不配置则不进行四舍五入运算      |  无
variable            | JSON对象， { [string]: number \| string }   | 配置数据，用于算式中的变量替换    | {}

## 当前版本包大小：
**min：**9.3kb  
**gzip：**3.83kb


## TODO:
- 增加校验，处理各种边界问题，处理错误异常
- 命令行调用
- 增加独立的config函数

## 更新日志：
- **20210711（version 0.0.2）：**
	* 调整项目配置，压缩代码（目前min包是17.7kb，CDN版gzip压缩后是7kb
	* 支持node环境和浏览器script标签引入的形式
- **20210717（version 0.0.4）：**
	* 优化配置，优化代码，减少产出体积（目前min包大小约是9.16kb，gzip压缩后约3.76kb
- **20210731（version 0.0.5）：**
	* 支持百分号运算
	* 优化文档