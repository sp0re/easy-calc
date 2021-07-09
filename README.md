# easy-calc
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

不过，大多数场景里我只是需要加减乘除和四舍五入这些基本运算，用不到 [decimal.js](https://www.npmjs.com/package/decimal.js) 里那么多方法；算式比较长时， [decimal.js](https://www.npmjs.com/package/decimal.js) 需要反复调用方法计算，比较繁琐，而且查英文文档对我这个英语负四级水平的普通前端来说也是十八层地狱级别的折磨，于是……

## 功能简介：
于是写了 **easy-calc** 这个方法。 **easy-calc** 基于 [big.js](https://www.npmjs.com/package/big.js) ，用法简单，支持正负整数和正负小数的加减乘除括号运算，支持公式变量替换，支持四舍五入，支持TS，没了（目前为止）。
```javascript
/* 基本使用 */
calc('0.1 + 0.2')
//结果：0.3  (就很棒
```





'( good1 *   3+good2*2- 10)*(8 /10)'    商品A买三个，商品B买两个，优惠券立减10元，最后总价打八折


清楚空格
判断变量替换完没有
测试各种边界错误，并抛出
TS

开发背景-功能简介-安装-使用-todo