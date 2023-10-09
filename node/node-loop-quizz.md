# Quizz 1

Using you're knowledge of the event loop, create a program which prints out the below. If the log line mentions a `setInterval` it must be printed inside a `setInterval` etc..

start
end
setInterval 1
promise 1
promise 2

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
  .then(() => console.log("promise1"))
  .then(() => {
    console.log("promise2");
    clearInterval(interval);
  })
}, 0);
console.log("end");
```

# Quizz 2

Extend the previous example to print out the following log lines, use `process.nextTick` and `setImmediate`

start
end
setInterval 1
promise 1
promise 2
processNextTick 1
setImmediate 1
promise 3
promise 4

```js
console.log("start");
const interval = setInterval(() => {
  console.log("setInterval 1");
  Promise.resolve()
  .then(() => console.log("promise1"))
  .then(() => {
    console.log("promise2");
    // clearInterval(interval);
    setImmediate(() => {
      console.log("setImmediate 1");
      Promise.resolve()
      .then(() => console.log("promise 3"))
      .then(() => console.log("promise 4"))
      .then(() => clearInterval(interval))
    });
    process.nextTick(() => {
      console.log("processNextTick 1");;
    });
  })
}, 0);
console.log("end");
```