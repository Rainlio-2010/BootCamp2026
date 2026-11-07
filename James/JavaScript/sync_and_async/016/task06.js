function devide(a, b, delay) {
    return new Promise(function (resolve, reject) {
        if (b === 0) {
            reject("b不能是0")
        } else {
            setTimeout(function () { resolve(a / b) }, delay)
        }
    })
}

result = devide(2, 0, 1000);

result
    .then(function (data) { console.log(data) })
    .catch(function (data) { console.log(data) })
