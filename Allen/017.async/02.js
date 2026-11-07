function wait(ms, msg = "Hello") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${msg}`);
    }, ms);
  });
}

async function times(a, b, delay) {
  await wait(delay);
  return a * b;
}

async function calculate() {
  const result = await times(2, 3, 2000);
  console.log(result);
}

calculate();
