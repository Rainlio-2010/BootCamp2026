// function multi(a, b, delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(a * b);
//     }, delay);
//   });
// }

// function div(value, b, delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(value / b);
//     }, delay);
//   });
// }

// multi(2, 6, 2000)
//   .then((value) => {
//     console.log(value);
//     return div(value, 3, 2000);
//   })
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

function multiply(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a * b);
    });
  });
}
function div(c, b, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(c / b);
    }, delay);
  });
}

const p = multiply(2, 6);
p.then((value) => {
  console.log(value);
  const p2 = div(value, 4, 2000);
  p2.then((result) => {
    console.log(result);
  });
});
