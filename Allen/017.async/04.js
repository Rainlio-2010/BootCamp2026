function wait(ms, msg = "Hello") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${msg}`);
    }, ms);
  });
}

async function divide(a, b, delay) {
  await wait(delay, "除法");

  if (b === 0) {
    throw new Error("除数不能为 0");
  }
  return a / b;
}

try {
  console.log(await divide(6, 0, 2000));
} catch (error) {
  console.log(error.message);
}
