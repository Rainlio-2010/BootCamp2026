const numbers = [1, 2, 3, 4];

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function times(a, b, delay) {
  await wait(delay);
  return a * b;
}

async function calculate() {
  for (const number of numbers) {
    const a = await times(2, number, 2000);
    console.log(a);
  }
}

calculate();
