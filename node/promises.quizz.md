# Question 1 - (10min)

Create a promise version of the async readFile function

```js
const fs = require("fs");

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
}
readFile("./files/demofile.txt", "utf-8")
    .then(
      data => console.log("File Read: ", data),
      err  => console.log("Failed to Read File", err)
    );
```
<!-- Another way -->
```js
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile); // promisify is a built it function which returns a promise which is handled in the code

readFile("./files/demofile.txt", "utf-8")
    .then(
      data => console.log("File Read: ", data),
      err  => console.log("Failed to Read File", err)
    );
```
# Question 2

Load a file from disk using readFile and then compress it using the async zlib node library, use a promise chain to process this work.

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibFn(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if(error) reject (error);
      resolve(result);
    });
  })
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
// --> Load it then zip it and then print it to screen
readFile("./files/demofile.txt", "utf-8")
    .then(data => zlibFn(data).then(data => console.log("Zipped data: ", data),err => console.log("Failed to Zip data", err)),
          err => console.log("failed to read data from file", err));
```

# Question 3
<!-- Convert the previous code so that it now chains the promise as well. -->
```js
const fs = require("fs");
const zlib = require("zlib");

function zlibFn(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if(error) reject (error);
      resolve(result);
    });
  })
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// returning another promise from the handler of the previous promise
readFile("./files/demofile.txt", "utf-8")
  .then(
        data => {
          return zlibFn(data);
        }, 
        err => console.lo(err)
  )
  .then(
        data => console.log(data),
        err => console.log(err)
  );
```

# Question 4

<!-- Convert the previous code so that it now handles errors using the catch handler -->
```js
const fs = require("fs");
const zlib = require("zlib");

function zlibFn(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if(error) reject (error);
      resolve(result);
    });
  })
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./files/demofile.txt", "utf-8")
  .then(
        data => {
          return zlibFn(data);
        }     
  )
  .then(
      data => console.log(data),
  )
  .catch(
    err => console.log(err)
  )
```

# Question 5

Create some code that tries to read from disk a file and times out if it takes longer than 1 seconds, use `Promise.race`

```js
function readFileFake(sleep) {
  return new Promise(resolve => setTimeout(resolve, sleep, "read"));
}

function timeout(sleep) {
  return new Promise((_, reject) => {
    setTimeout(reject, sleep, "timeout")
  })
}

Promise.race([readFileFake(5000), timeout(1000)])
.then(data => console.log(data))
.catch(err => console.log(err));

// readFileFake(5000); // This resolves a promise after 5 seconds, pretend it's a large file being read from disk
```

# Question 6

Create a process flow which publishes a file from a server, then realises the user needs to login, then makes a login request, the whole chain should error out if it takes longer than 1 seconds. Use `catch` to handle errors and timeouts.

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

function safePublish() {
  return publish().then(
    res => {
      if(res.status === 403) {
        return authenticate();
      }
      return res;
    }
  );
}

Promise.race( [safePublish(), timeout(3000)])
  .then(
    res => {
        console.log("Published");
      }
  )
  .catch(err => {
    if(err === "timeout") {
      console.error("Request timed out");
    } else {
      console.error(err);
    }
  });
```
