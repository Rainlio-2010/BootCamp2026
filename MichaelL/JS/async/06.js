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

async function main() {
  console.time("main");
  try {
    console.log("Step 1: Calculating 3×5");
    const result = await times(3, 5, 1000);
    console.log("Result:", result);
    console.log("Step 2: Dividing by 2");
    const result2 = await div(result, 0, 1000);
    console.log("Result:", result2);
    console.log("Step 3: Dividing by 0");
    const result3 = await div(result2, 0, 1000);
    console.log("Result:", result3);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    console.log("Calculation finished");
    console.timeEnd("main");
  }
}

main();
