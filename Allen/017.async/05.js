function wait(ms, msg = "Hello") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${msg}`);
    }, ms);
  });
}

async function times(a, b, delay) {
  await wait(delay, "乘法");
  return a * b;
}

async function calculate() {
  console.time("总用时");
  const result = await Promise.all([times(2, 3, 2000), times(4, 5, 2500)]);
  console.log(result);
  console.timeEnd("总用时1");
}

calculate()