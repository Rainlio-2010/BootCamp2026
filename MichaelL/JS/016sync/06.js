function divide(a, b, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) {
        reject("error");
      } else {
        resolve(a / b);
      }
    }, delay);
  });
}
const p = divide(2, 1, 1000);
p.then((value) => {
  console.log(value);
}).catch((error) => {
  console.log(error);
});
