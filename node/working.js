function* demo() {
    console.log("1");
    yield;
    console.log("2");
  }
  console.log("start");
  const it = demo(); // Doesn't execute the body of the function
  console.log("before iteration");
  console.log(it.next()); // Executes generator and prints out whats yielded
  console.log(it.next()); // Returns done: true
  console.log(it.next()); // Returns same ended iterator
  console.log("after iteration");
  