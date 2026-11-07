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
  const result = await times(2, 3, 2000);

  console.log(result);
}

calculate();
//////////////////////////////////////////////////////////////

function times(a, b, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a * b);
    }, delay);
  });
}

async function getData() {
  const result = await times(2, 3, 2000);

  console.log(result);
}
getData();
