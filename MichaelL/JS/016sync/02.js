function myGreeting(a, b) {
  console.log(a * b);
}

let a = 5;
let b = 3;

const myTimeout = setTimeout(myGreeting, 2000, a, b);