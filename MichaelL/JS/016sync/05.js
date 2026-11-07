function multiply(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a * b);
    }, 2000);
  });
}
const p = multiply(2, 3);
p.then((value) => {
  console.log(value);
});
