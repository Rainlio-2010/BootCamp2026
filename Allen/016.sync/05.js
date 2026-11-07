function times(a, b, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = a * b;
      resolve(`waited for ${delay} seconds, the result is ${result}`);
    }, delay);
  });
}

times(3, 5, 2).then((result) => {
  console.log(result);
});
