const numbers = [1, 2, 3, 4];

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

console.time("用时");
async function cal(arr) {
  const results = [];
  for (const i of arr) {
    const result = await times(i, 2, 2000);
    results.push(result);
  }
  return results;
}

const result = await cal(numbers);

console.log(result);
console.timeEnd("用时");
