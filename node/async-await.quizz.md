# Question 1

Convert the promise version of the multi-file loader over to using async/await

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

// Anonymous function, reads file one by one
// (async () => {
//   for(let file of files) {
//     let value = await readFile(file, "utf8");
//     console.log(value);
//   }
// })(); // IIFE


// A Better approach, since it reads both the files in parallel
(async () => {
    let promises = files.map(file => readFile(file, "utf8"));
    let values = await Promise.all(promises);
    console.log(values);
})();


// let promises = files.map(name => readFile(name, { encoding: "utf8" }));
// Promise.all(promises).then(values => {
//   // <-- Uses .all
//   console.log(values);
// });
```

# Question 2

Again convert the promise version of the multi-file loader over to using async/await but using a custom async iterator with the following syntax

node --harmony-async-iteration <file.js>

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileIterator = files => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if(this.x >= files.length) {
        return Promise.resolve({ done: true })
      }
      let file = files[this.x++];
      return readFile(file, "utf8").then(data => {
        return { done: false, value: data }
      })
    }
  })
});

(async () => {
  for await (let x of fileIterator([
    "./files/demofile.txt",
    "./files/demofile.other.txt"
  ])) {
    console.log(x);
  }
})();
```
