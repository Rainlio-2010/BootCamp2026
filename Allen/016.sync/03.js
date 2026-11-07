function times(a, b) {
  return console.log(a * b);
}
setTimeout(times, 3000, 2, 3);
setTimeout(times, 2000, 3, 5);