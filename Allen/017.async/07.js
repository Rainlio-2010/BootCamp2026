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

  if (b === 0) {
    throw new Error("除数不能为 0");
  }
  return a / b;
}

async function main() {
  try {
    const a = await times(3, 5, 1000);
    console.log(a);
    const b = await divide(a, 0, 1000);
    console.log(b);
    const c = await divide(b, 0, 1000);
    console.log(c);
  } catch (error) {
    console.log(error.message);
  }
}

main()