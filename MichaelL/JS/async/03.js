function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function times(a, b, delay) {
  await wait(delay);
  return a * b;
}

async function div(a, b, delay) {
  await wait(delay);
  try {
    if (b === 0) throw new Error("can't divide by zero");
  } catch (err) {
    console.log("can't be 0");
  } finally {
    return a / b;
  }
}

async function calculate() {
  const result = await times(2, 6, 2000);

  console.log(result);

  const result2 = await div(result, 3, 2000);
  console.log(result2);
}

async function main() {
  console.time("calculate");

  await calculate();

  console.timeEnd("calculate");
}

main();
