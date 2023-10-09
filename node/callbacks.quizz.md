# Question 1

The below code errors when you run it.

Make it run without errors but you cannot change the location of the `let` statement, that has to stay at the end.

```js
function doAsyncTask(cb) {
  setImmediate(cb);
}
doAsyncTask(_ => console.log(message));

let message = "Callback Called";
```

# Question 2

The below code swallows the error and doesn't pass it up the chain, make it pass the error up the stack using the next callback.

```js
const fs = require("fs");

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    if(err) {
      next(err);
    } else {
      next(null, data);
    }
  });
}

readFileThenDo((err, data) => {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

# Question 3

Instead of passing it up the stack throw it instead and try to catch it later on.

```js
const fs = require("fs");

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    if (err) throw err; // This err is thrown, try catch is not executed, since callback function will not be executed at this point of time
    next(null,data);
    
  });
}
// Hint use try..catch
try {
  readFileThenDo((_, data) => console.log(data));
} catch(err) {
 console.log("Error from catch block: " + err);
}
```
