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

async function divide(a, b, delay) {
  await wait(delay, "除法");
  try {
    if (b === 0) {
      throw new Error("除数不能为 0");
    }

    return a / b;
  } catch (error) {
    throw error;
  }
}

async function process() {
  const a = await times(2, 6, 1000);
  const b = await divide(a, 0, 2000);
  console.log(`${a},${b}`);
}

console.time(process());
