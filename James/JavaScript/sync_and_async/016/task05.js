function times(a, b, delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(a * b) }, delay)
    })
}

// result = times(2, 3, 1000);

// // result.then(function (data) { console.log(data) })
// setTimeout(() => { console.log(result) }, 1500)

// const promise = times(2, 3, 1000);
// console.log(promise); // 打印:Promise {<pending>} —— 因为还没到1秒

const promise = times(2, 3, 1000);
console.log(promise); // 打印:Promise {<pending>} —— 因为还没到1秒

setTimeout(() => {
    console.log(promise); // 1秒后再打印,这次可能是:Promise {<fulfilled>: 6}
}, 1500);