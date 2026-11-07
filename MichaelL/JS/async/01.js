function wait(a, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a);
    }, delay);
  });
}

async function getData() {
  const result = await wait(2, 2000);

  console.log(result);
}
getData();

// const p = wait(2, 1000);
// p.then((value) => {
//   console.log(value);
// });
