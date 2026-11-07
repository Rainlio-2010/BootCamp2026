function divide(a, b, delay = 1) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error("分母不能为零"));
    } else {
      setTimeout(() => {
        const result = a / b;
        resolve(`waited for ${delay} seconds, the result is ${result}`);
      }, delay * 1000);
    }
  });
}

divide(6, 2, 2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  });
