# calc-easy
**一个专注于易用性的、精度准确的基本运算库**

### calc-easy 是什么
calc-easy 是一个基于 [big.js](https://www.npmjs.com/package/big.js) 的基本运算库，可以运行在大部分常见的js环境中，用法简单直观，目前支持加+、减-、乘*、除/、括号()、百分号%的混合运算，可以保持浮点数、超大数运算和四舍五入运算的精度准确。
```javascript
//精度丢失现象：
0.1 + 0.2
//0.30000000000000004
19.9 * 100
//1989.9999999999998
9007199254740992 + 1
//9007199254740992
(0.355).toFixed(2)
//0.35
```

### calc-easy 尝试解决什么问题
calc-easy 专注于解决传统的计算库在普通场景下使用时用法过于复杂、代码不够清晰直观的问题。    
calc-easy 没有复杂的链式调用，支持且仅支持以字符串的形式输入数学表达式，然后直接输出字符串形式的计算结果，以达到简洁直观的目的。    
```javascript
let expression = '(0.1 + 0.2) * 0.3 / 1';   //数学表达式
calc(expression)
// '0.09' 
```

### 特性
- 直接解析表达式，简单直观易用
- 文档完整
- 覆盖日常项目开发常用运算，支持正负整数、浮点数、超大数，计算精度准确
- 兼容常见的浏览器和 NodeJS 环境
- 轻量。如果现在还不够轻，将继续努力做到更轻
- 基于 big.js，站在巨人的肩膀上，专业的事交给专业的人
- typescript支持
- 有单元测试

### 安装引入
安装：
```shell
npm install calc-easy --save
```
ES module:
```javascript
import calc, {createCalc} from 'calc-easy';
```
CommonJS:
```javascript
const calc = require('calc-easy');
const createCalc = calc.createCalc;
// or:
// const {createCalc} = require('calc-easy');
```
CDN:
```html
<script src='https://unpkg.com/calc-easy@1.0.0/dist/calc-easy.min.js'></script>
```
```javascript
var calc = calcEasy;
var createCalc = calcEasy.createCalc;
```

### 快速使用
```javascript
import calc from 'calc-easy';
/* 基本使用 */
calc('1+2+3+4*5-6')
//'20'
calc('0.1 + 0.2')
//'0.3'  // 精度准确
calc('9007199254740992+1')
//'9007199254740993'  // 精度准确
calc('0.355', {toFixed: 2})
//'0.36'  // 精度准确

/* 使用变量 */
const data = {
    goodA: 12.99,
    goodB: 3.8,
    coupon: 10,
    discount: 8
};
calc('(goodA * 3 + goodB * 2 - coupon) * (discount / 10)', {
	variable: data,
	toFixed: 2
})
//'29.26'
```

### API
<table>
	<tr>
		<th>方法</th>
		<th>简介</th>
		<th>入参</th>
		<th>返回值</th>
	</tr>
	<tr>
		<td>calc</td>
		<td>执行运算的函数，输入表达式字符串和配置，返回结果字符串</td>
		<td>(expression, config?)</td>
		<td>计算结果 string</td>
	</tr>
	<tr>
		<td>createCalc</td>
		<td>用来自定义calc的函数。输入一个config配置，返回默认配置为该配置的calc方法。后续执行该calc方法时传入的新config，如具体的项中有与默认config中同名的，新的值将替换默认值来执行，详见下面示例。</td>
		<td>(config)</td>
		<td>calc方法</td>
	</tr>
</table>

calc: (expression: string, config?: config) => string
<table>
	<tr>
		<th>入参（按顺序）</th>
		<th>类型</th>
		<th>是否必填</th>
	</tr>
	<tr>
		<td>expression。数学表达式，支持加、减、乘、除、百分号和括号的混合运算。可以带“变量”，带“变量”时需要在config配置variable</td>
		<td>string</td>
		<td>是</td>
	</tr>
	<tr>
		<td>config配置项</td>
		<td>见config表</td>
		<td>否。表达式带“变量”时config需配置variable，此时为必填</td>
	</tr>
</table>

createCalc: (config) => calc
<table>
	<tr>
		<th>入参</th>
		<th>类型</th>
		<th>是否必填</th>
	</tr>
	<tr>
		<td>config配置项</td>
		<td>见config表</td>
		<td>是</td>
	</tr>
</table>

config支持两种格式：{variable?, toFixed?} 和 [variable?, toFixed?]
<table>
	<tr>
		<th>参数</th>
		<th>类型</th>
		<th>简介</th>
	</tr>
	<tr>
		<td>variable</td>
		<td>JSON。{ [string]: number | string }</td>
		<td>用于表达式中的“变量”替换，值支持number和string，建议输入string。在必须支持大数的场景，必须是string</td>
	</tr>
	<tr>
		<td>toFixed</td>
		<td>number</td>
		<td>四舍五入到多少位小数，不传则不进行四舍五入运算。输入0或正整数</td>
	</tr>
</table>

具体类型参见 [calc-easy.min.d.ts](https://unpkg.com/calc-easy@1.0.0/dist/calc-easy.min.d.ts) 

### 例子
```javascript
import calc, {createCalc} from 'calc-easy';
/* 如果需要，也可以使用模板字符串传入变量 */
let data = {
	a: 1,
	b: 2,
	c: '3'
};
calc(`${data.a}-${data.b}-${data.c}`)
//'-4'

/* 使用createCalc自定义calc */
const myCalc = createCalc({
	variable: {
		Pi: 3.14
	},
	toFixed: 1
});

myCalc('1+Pi')
//'4.1'
myCalc('1+Pi+y', {
	variable: {
		Pi: 3.1416, //可以覆盖默认config执行，只影响当次。
		y: 2
	},
	toFixed: 4 //可以覆盖默认config执行，只影响当次。
})
//'6.1416' 
myCalc('Pi + x + y', [{ //数组形式的config
	x: 1,
	y: 2
}])
//'6.14'

const toFixed = createCalc({toFixed: 2});
toFixed('0.1234')
//'0.12'
toFixed('1/3')
//'0.33'
```    

更多例子可以参考 [测试用例](https://github.com/sp0re/easy-calc/tree/master/tests) 

### 与其它数学计算库对比
（仅个人观点）
<table>
	<tr>
		<th>库</th>
		<th>优势</th>
		<th>劣势</th>
	</tr>
	<tr>
		<td>mathjs</td>
		<td>大而全，可靠，兼容性强，方法丰富，文档齐全，使用场景广，用户广泛；支持直接解析表达式，代码直观</td>
		<td>包非常大，压缩过后依然有六百多KB；解析表达式的用法并不直接支持大数（math.evaluate('9007199254740992 + 1')）和精度保持（math.evaluate('0.1+0.2')），貌似需要配置</td>
	</tr>
	<tr>
		<td>big.js</td>
		<td>轻量、快速、可靠，兼容性强，方法较丰富，文档齐全，用户广泛</td>
		<td>链式调用比较长时不够直观：Big(x).div(y).plus(z).times(9).plus(976.54321).div('2598.11772')</td>
	</tr>
	<tr>
		<td>calc-easy</td>
		<td>简单直观易用，文档完整，轻量，支持TS。0配置可以直接进行精度准确的计算</td>
		<td>支持的运算方法不够丰富。没人用（笑</td>
	</tr>
	<tr>
		<td>其它非链式调用的库</td>
		<td>简单</td>
		<td>不一定支持超大数；不一定有文档；使用方式不直观，不利于代码管理：
			<br/>var result1 = add(1, 2)
			<br/>var result2 = plus(result1, 2)
			<br/>var result_end = plus(result2, div(0.01, 0.02))
		</td>
	</tr>
	<tr>
		<td>原生js不使用库</td>
		<td>简单直观，符合常识，没有依赖</td>
		<td>精度丢失：
			<br/>0.1 + 0.2
			<br/>//0.30000000000000004
			<br/>19.9 * 100
			<br/>//1989.9999999999998
			<br/>9007199254740992 + 1
			<br/>//9007199254740992
			<br/>(0.355).toFixed(2)
			<br/>//0.35
		</td>
	</tr>
</table>

### Licence
MIT

### 当前版本包大小
min：10.9KB  
gzip：4.28KB

### 更新日志
- **20210711（version 0.0.2）：**
	* 调整项目配置，压缩代码（目前min包是17.7kb，CDN版gzip压缩后是7kb
	* 支持node环境和浏览器script标签引入的形式
- **20210717（version 0.0.4）：**
	* 优化配置，优化代码，减少产出体积（目前min包大小约是9.16kb，gzip压缩后约3.76kb
- **20210731（version 0.0.5）：**
	* 支持百分号运算
	* 优化文档
- **20210803（version 0.0.6）：**
	* 修改打包配置，修复ie11报错
- **20210918（version 0.0.7）：**
	* 修复github安全报警
	* 优化readme
- **20220304（version 0.0.8）：**
	* 支持大于9007199254740992的大数
	* 修复正号（1*+2）导致的报错
	* 引入jest单元测试
- **20220310（version 1.0.0）：**
	* config支持json和数组两种格式
	* 加入createCalc方法
	* 重写文档
	* 完善测试