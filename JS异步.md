# JavaScript 异步

JS 中的异步发展由 callback -> Promise -> Generator -> async/await，具体处理可以分为并行和串行两种，具体的使用可以自由组合。

异步的需要注意（主要就是单一功能原则，流程清晰）：

- 不要嵌套功能。给他们姓名并将他们放在程序的顶层

- 利用函数提升来利用你的优势来移动函数

- 处理每个回调中的每一个错误。使用标准来帮助你

- 创建可重用的函数并将它们放在模块中以减少理解代码所需的认知负载。将代码分割成小块这样也可以帮助您处理错误，编写测试，强制您为您的代码创建稳定且文档化的公共API，并有助于重构

  

### 回调函数( Callback )

回调函数是将将代码的执行权限给予调用方，当调用方执行完成条件后调用此函数将权限交回到被调用方。

缺点在与容易形成回调地狱(回调层层嵌套，不能清晰的查看代码运行逻辑)。

```js
// 定时器是典型的回调
function doSomething(data){
    console.log("回调完成",data)
}
setTimeout(()=>{
  doSomething("test callback");
});
function errHandle(err,data){
	if(err) return console.log(err);
	console.log(data);
}
function read(params,callback){
    let err,data;
	//...处理参数拿到数据
    //回调数据
    callback(err,data);
}
read({key:"value"},errHandle);
// 回调地狱,需要在前一次回调完成的时进行下一次调用
read({},(err,data) =>{
   if(err)return console.log(err);
   read({data:data},(err,data1) => {
       if(err)return console.log(err);    
       read({data1:data1},(err,data2) => {
           if(err)return console.log(err);    
       		//...可以嵌套多层，越多越难调试
   		}); 
   });
});
// 需要自己注意代码整洁和模块化，流程化，不然还是会出现回调地狱
const getData1 = () => Promise.resolve("data1");
const getData2 = (data1) => Promise.resolve(data1+",data2");
const getData3 = (data2) => Promise.resolve(data2+",data3");
getData1().then((resData1) => {
  getData2(resData1).then((resData2) => {
    getData3(resData2).then((resData3)=>{
      console.log('resData3:', resData3)
    })
  });
});
```

## Promise

因为 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回的是 promise， 所以它们可以被链式调用。

1. **并行**
   - 一个成功，返回成功结果，全部失败，返回失败
   - 一个失败，返回失败结果，全部成功，返回成功
   - 等待全部完成，返回成功或失败结果数组
2. **串行**
   - 一个失败就失败
   - 失败后处理错误，继续执行

```js
//# 1. 简单调用
// 成功的回调函数
function successCallback(result) {
  console.log('成功: ' + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log('失败: ' + error);
}
function createPromsie() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('aaaaaa');
    }, 2000);
  });
}
createPromsie().then(successCallback, failureCallback);

//# 2. 链式调用,最后捕捉错误，适合遇到错误就停止链式执行的情况
//链式调用如果没有返回值，则返回值是 undefined
function createPromsie(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(str);
    }, 2000);
  });
}
createPromsie('11111')
  .then(res => {
    console.log('1. ', res);
    return createPromsie(res + ',22222');
  })
  .then(res => {
    console.log('2. ', res);
    return createPromsie(res + ',33333');
  })
  .then(res => {
    console.log('3. ', res);
    return Promise.reject('错误');
  })
  .catch(err => {
    console.log(err);
  });

// 1.  11111
// 2.  11111,22222
// 3.  11111,22222,33333
// 错误
function createPromsie(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, 2000);
  });
}
createPromsie('11111')
  .then(res => {
    console.log('1. ', res);
    return createPromsie(res + ',22222');
  })
  .then(res => {
    console.log('2. ', res);
    return createPromsie(res + ',33333');
  })
  .then(res => {
    console.log('3. ', res);
    return Promise.reject('错误');
  })
  .catch(err => {
    console.log(err);
  });

//11111

//# 3. 这种适合单独处理错误，并且不会因为错误而中断执行的时候使用
function createPromsie(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, 2000);
  });
}
createPromsie('11111')
  .then(
    res => {
      console.log('1. ', res);
      return createPromsie(res + ',22222');
    },
    err => {
      console.log('err1', err);
      return err + ',44444';
    }
  )
  .then(
    res => {
      console.log('2. ', res);
      return res + ',33333';
    },
    err => {
      console.log('err2', err);
      return err + ',55555';
    }
  );

// err1 11111
// 2.  11111,44444

//# 4. 和上边的形式相同
function createPromsie(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, 2000);
  });
}
createPromsie('11111')
  .then(res => {
    console.log('1. ', res);
    return createPromsie(res + ',22222');
  })
  .catch(err => {
    console.log('err1', err);
    return err + ',44444';
  })
  .then(res => {
    console.log('2. ', res);
    return res + ',33333';
  })
  .catch(err => {
    console.log('err2', err);
    return err + ',55555';
  });
// err1 11111
// 2.  11111,44444

//# 5. 最终直接一次
function createPromsie(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, 2000);
  });
}
createPromsie('11111')
  .then(res => {
    console.log('1. ', res);
    return createPromsie(res + ',22222');
  })
  .catch(err => {
    console.log('err1', err);
    return err + ',44444';
  })
  .then(res => {
    console.log('2. ', res);
    return res + ',33333';
  })
  .catch(err => {
    console.log('err2', err);
    return err + ',55555';
  })
  .finally(res=>console.log(res))
```

### 全局事件

```js
/* 当 Promise 被拒绝时，会有下文所述的两个事件之一被派发到全局作用域（通常而言，就是window；如果是在 web worker 中使用的话，就是 Worker 或者其他 worker-based 接口）。这两个事件如下所示：

rejectionhandled
当 Promise 被拒绝、并且在 reject 函数处理该 rejection 之后会派发此事件。
unhandledrejection
当 Promise 被拒绝，但没有提供 reject 函数来处理该 rejection 时，会派发此事件。
以上两种情况中，PromiseRejectionEvent 事件都有两个属性，一个是 promise 属性，该属性指向被驳回的 Promise，另一个是 reason 属性，该属性用来说明 Promise 被驳回的原因。

因此，我们可以通过以上事件为 Promise 失败时提供补偿处理，也有利于调试 Promise 相关的问题。在每一个上下文中，该处理都是全局的，因此不管源码如何，所有的错误都会在同一个处理函数中被捕捉并处理。*/

window.addEventListener("unhandledrejection", event => {
  /* 你可以在这里添加一些代码，以便检查
     event.promise 中的 promise 和
     event.reason 中的 rejection 原因 */

  event.preventDefault();
}, false);
```

### 旧 API 得封装

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
// setTimeout 并不会reject 因此可以去掉catch
wait(10000).then(() => saySomething("10 seconds"));
```

### Promise.all

Primise.all 是并行运行的，当参数数组中所有的Promise都成功才返回成功，否则返回失败

```js
function createPromsie(str,time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(str);
    }, time);
  });
}
function createPromsie1(str,time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, time);
  });
}
// 简单使用
Promise.all([createPromsie('1',1000),createPromsie('2',2000),createPromsie('3',3000)])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
//链式
// 组合
const func1 = () => createPromsie('1',1000);
const func2 = () => createPromsie('2',2000);
const func3 = () => createPromsie('3',3000);
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve())
.then(result3 => { /* use result3 */ });

Promise.resolve().then(func1).then(func2).then(func3);
```



### Promise.race

Primise.race 也是并行运行的

```js
function createPromsie(str,time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject(str);
    }, time);
  });
}
Promise.race([createPromsie('1',1000),createPromsie('2',2000),createPromsie('3',3000)]);
```

### 执行时机

```js
// then 中的函数被放置在一个微任务队列中异步调用，只有当事件队列全部执行结束后才会开始执行
// 具体要参考 nodejs 或者 浏览器的事件循环
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```

### Promise嵌套

```js
/*嵌套 Promise 是一种可以限制 catch 语句的作用域的控制结构写法。明确来说，嵌套的 catch 仅捕捉在其之前同时还必须是其作用域的 failureres，而捕捉不到在其链式以外或者其嵌套域以外的 error。如果使用正确，那么可以实现高精度的错误修复。*/

const createResolvePromise = (str, time) =>
  new Promise((res, rej) => setTimeout(() => res(str), time));
const createRejectPromise = (str, time) =>
  new Promise((res, rej) => setTimeout(() => rej(str), time));
let doSomethingCritical = () => createResolvePromise('1', 1000);
let doSomethingOptional = () => createResolvePromise('2', 1000);
let doSomethingExtraNice = params => createResolvePromise('3', 1000);
let moreCriticalStuff = () => createResolvePromise('4', 1000);

doSomethingCritical()
  .then(result =>
    doSomethingOptional()
      .then(optionalResult => {
        console.log(optionalResult);
        return doSomethingExtraNice(optionalResult);
      })
      .catch(e => {
        console.log(e);
      })
  ) // 即使有异常也会忽略，继续运行;(最后会输出)
  .then(() => moreCriticalStuff())
  .catch(e => console.log('Critical failure: ' + e)); 
// 2

doSomethingCritical = () => createRejectPromise('1', 1000);
doSomethingCritical()
  .then(result =>
    doSomethingOptional()
      .then(optionalResult => {
        console.log(optionalResult);
        return doSomethingExtraNice(optionalResult);
      })
      .catch(e => {
        console.log(e);
      })
  ) // 即使有异常也会忽略，继续运行;(最后会输出)
  .then(() => moreCriticalStuff())
  .catch(e => console.log('Critical failure: ' + e));
//1

doSomethingOptional = () => createRejectPromise('1', 1000);
doSomethingCritical()
  .then(result =>
    doSomethingOptional()
      .then(optionalResult => {
        console.log(optionalResult);
        return doSomethingExtraNice(optionalResult);
      })
      .catch(e => {
        console.log(e);
      })
  ) // 即使有异常也会忽略，继续运行;(最后会输出)
  .then((res) =>{console.log(res,"aaa"); return moreCriticalStuff()})
  .catch(e => console.log('Critical failure: ' + e)); 
// 1
// undefined "aaa"
```



## async/await

对于 Promise 的语法糖，同步写法。

```js
/* 学习来源 https://careersjs.com/magazine/async-patterns/ */
function doSomethingAsync(val) {
  return new Promise.resolve(val || 3)
}
function doAnotherAsync(val) {
  return new Promise.resolve(val || 4)
}

/* 比较混乱的 */
function getVals1() {
  return doSomethingAsync().then(function (val) {
    return doAnotherAsync(val).then(function (anotherVal) {
      // Here we need both val and anotherVal so we nested
      return val + anotherVal
    })
  })
}
/* 稍好一点的 */
function getVals2() {
  let value

  return doSomethingAsync().then(function (val) {
    // send val to the outer scope so others can use it
    value = val
    return doAnotherAsync(val)
  }).then(function (anotherVal) {
    // Here we grab value from outside
    return value + anotherVal
  })
}

/* 箭头函数的 ,减少了代码,并没有什么实质的改变*/
function getVals3() {
  return doSomethingAsync().then(val => doAnotherAsync(val).then(anotherVal => val + anotherVal))
}

function getVals4() {
  let value

  return doSomethingAsync()
    .then(val => (value = val, doAnotherAsync(val)))
    .then(anotherVal => value + anotherVal)
}
/* 结构清晰的 */
async function getVals5() {
  let val = await doSomethingAsync()
  let anotherVal = await doAnotherAsync(val)

  return val + anotherVal
}

/* “随机”顺序异步操作,这两者的代码并没有什么区别,但是async比promise.then的可读性摇号一点 */
function getVals6() {
  return doSomethingAsync()
    .then(val => doAnotherAsync(val))
    .then(anotherVal => /* We don't need 'val' here */ 2 * anotherVal)
}
async function getVals7() {
  let val = await doSomethingAsync()
  let anotherVal = await doAnotherAsync(val)

  return 2 * anotherVal
}
/* “随机”并行异步操作 */

function getVals8() {
  return Promise.all([doSomethingAsync(), doAnotherAsync()])
    .then(function ([val, anotherVal]) {
      return val + anotherVal
    })
}
async function getVals9() {
  let [val, anotherVal] = await Promise.all([doSomethingAsync(), doAnotherAsync()])
  return val + anotherVal
}
/* 迭代并行异步操作 ,简单的操作async并不能提供太多的清晰度,但是一旦比较复杂就会提升较多的清晰度*/
var values = [1, 2, 3, 4, 5, 6];
function doAsyncToAll1(values /* array */) {
  return Promise.all(values.map(doSomethingAsync))
}
async function doAsyncToAll2(values /* array */) {
  return await Promise.all(values.map(doSomethingAsync))
}
function doAsyncToAll3(values /* array */) {
  return Promise.all(values.map(val => {
    return doSomethingAsync(val)
      .then(anotherVal => doAnotherAsync(anotherValue * 2))
  }))
}
function doAsyncToAll4(values /* array */) {
  return Promise.all(values.map(async val => {
    let anotherVal = await doSomethingAsync(val)
    return doAnotherAsync(anotherValue * 2)
  }))
}
/* 迭代顺序异步操作 */

function doAsyncToAllSequentially1(values) {
  return values.reduce((previousOperation, val) => {
    return previousOperation.then(() => doSomethingAsync(val))
  }, Promise.resolve())
}
async function doAsyncToAllSequentially2(values) {
  for (let val of values) {
    await doSomethingAsync(val)
  }
}
/* 当不仅仅是使操作顺序进行,则可以继续使用 reduce */
function doAsyncToAllSequentially3(values) {
  return values.reduce((previousOperation, val) => {
    return previousOperation.then(
      total => doSomethingAsync(val).then(
        newVal => total + newVal
      )
    )
  }, Promise.resolve(0))
}
/* 这样会更加清晰*/
async function doAsyncToAllSequentially4(values) {
  let total = 0
  for (let val of values) {
    let newVal = await doSomethingAsync(val)
    total += newVal
  }
  return total
}
/* 也可以使用 reduce */
async function doAsyncToAllSequentially5(values) {
  return values.reduce(async (previous, val) => {
    let total = await previous
    let newVal = await doSomethingAsync(val)

    return total + newVal
  }, Promise.resolve(0))
}
```

### 错误处理

适用于同步情况，不用每个Promise去写catch，只需要在使用的时候来处理一次

```js
(async () => {
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    // 抽离成公共方法
    const awaitWrap = (promise) => {
        return promise
            .then(data => [null, data])
            .catch(err => [err, null])
    }

    const [err, data] = await awaitWrap(fetchData())
    console.log('err', err)
    console.log('data', data)
    // err null
    // data fetch data is me
})()

// 作者：Vincent.W
// 链接：https://juejin.im/post/6844903767129718791
```



```typescript
function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}

// 作者：Vincent.W
// 链接：https://juejin.im/post/6844903767129718791
```



## Generator

generator 中文名叫构造器,返回一个生成器对象。

```js
function* foo() {
  for (let i = 1; i <= 3; i++) {
    let x = yield `等我一下呗，i = ${i}`;
    console.log(x);
  }
}
setTimeout(() => {
  console.log('终于轮到我了');
}, 1);
var a = foo();
console.log(a); // foo {<closed>}
var b = a.next();
console.log(b); // {value: "等我一下呗，i = 1", done: false}
var c = a.next();
console.log(c); // {value: "等我一下呗，i = 2", done: false}
var d = a.next();
console.log(d); // {value: "等我一下呗，i = 3", done: false}
var e = a.next();
console.log(e); // {value: undefined, done: true}
// 终于轮到我了

//Generator.prototype.throw()
function* gen() {
  while(true) {
    try {
       yield 42;
    } catch(e) {
      console.log("Error caught!");
    }
  }
}

var g = gen();
g.next(); // { value: 42, done: false }
g.throw(new Error("Something went wrong")); // "Error caught!"

//Generator.prototype.return() 返回给定的值并结束生成器。
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next();        // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
```

