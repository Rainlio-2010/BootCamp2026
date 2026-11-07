function wait(ms, msg = "Hello") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${msg}`);
    }, ms);
  });
}

async function getResult() {
  let response = await wait(1000, "async");
  console.log(response);
}

wait(1000, "then").then((result) => {
  console.log(result);
});

getResult();
