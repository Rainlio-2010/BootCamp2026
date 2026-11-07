function times(a, b) {
    const result = a * b;
    // console.log(result);
    return result;
}


function print(a, b) {
    console.log(times(a, b))
}


function runtimes() {
    console.log("start")
    setTimeout(print, 1000, 2, 3)
    setTimeout(print, 2000, 4, 3)
}

runtimes()

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 300);
});