function times(a, b) {
  return console.log(a * b);
}

function mutiPrint(func, array, a, b) {
  let totalDelay = 0;

  for (let i = 0; i < array.length; i++) {
    totalDelay += array[i];

    setTimeout(func, totalDelay * 1000, a, b);
  }

  return "开始计时";
}

console.log(mutiPrint(times, [1, 2, 3, 4], 2, 3));
