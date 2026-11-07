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

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

async function calculate() {
  try {
    const result = await times(2, 6, 2000);

    console.log(result);

    const result2 = await div(result, 0, 2000);

    console.log(result2);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Calculation finished");
  }
}

async function main() {
  console.time("calculate");

  await calculate();

  console.timeEnd("calculate");
}

main();
