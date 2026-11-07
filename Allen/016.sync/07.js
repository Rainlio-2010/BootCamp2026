function times(a, b, delay) {
  const result = a * b;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), delay * 1000);
  });
}

function divide(a, b, delay = 1) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error("除法分母不能为零"));
    } else {
      setTimeout(() => {
        const result = a / b;
        resolve(result);
      }, delay * 1000);
    }
  });
}

// then chain
times(2, 6, 2)
  .then((result) => {
    console.log(`乘法结果是 ${result}`);
    return divide(result, 3, 2);
  })
  .then((result) => {
    console.log(`除法结果是 ${result}`);
    return result;
  });

// 嵌套
times(2, 6, 2).then((result) => {
  console.log(`乘法结果是 ${result} [嵌套]`);
  divide(result, 3, 2).then((re) => console.log(`除法结果是 ${re} [嵌套]`));
});

// nested then catch
times(2, 6, 2).then((resultTimes) => {
  console.log(`乘法结果是 ${resultTimes} [嵌套]`);
  divide(resultTimes, 0, 2)
    .then((resultDivide) => {
      console.log(`除法结果是 ${resultDivide} [嵌套]`);
      return {
        resultTimes,
        resultDivide,
      };
    })
    .then((results) => console.log(results))
    .catch((err) => {
      console.log(err.message);
      const fallbackResult = {
        resultTimes,
        resultDivide: null,
      };

      console.log(fallbackResult);
      return fallbackResult;
    });
});
