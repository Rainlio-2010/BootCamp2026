function times(a, b, delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(a * b) }, delay)
    })
}

function devide(a, b, delay) {
    return new Promise(function (resolve, reject) {
        if (b === 0) {
            setTimeout(() => reject("b不能是0"), delay)
        } else {
            setTimeout(function () { resolve(a / b) }, delay)
        }
    })
}


这个是嵌套的
times(2, 6, 1000)
    .then(result1 => {
        console.log(result1);
        devide(result1, 3, 1000)
            .then(result2 => {
                console.log(result2);
                devide(result2, 0, 1000)
                    .then(result3 => console.log(result3))
                    .catch(err3 => console.log(`err3这一步出错了${err3}`))
            })
            .catch(err2 => console.log(`err2这一步出错了${err2}`))

    });


这个是链式的
times(2, 6, 1000)
    .then(data1 => {
        console.log(data1)
        return devide(data1, 3, 1000)
    })
    .then(data2 => {
        console.log(data2)
        return devide(data2, 2, 1000)
    })
    .then(data3 => {
        console.log(data3)
        return devide(data3, 0, 1000)
    })
    .catch(errda3 => {
        console.log(`errda3错了 ${errda3}`)
        throw errda3
    })
    .then(data4 => {
        console.log(data4)
    })
    .catch(errda4 => {
        console.log(`errda4错了 ${errda4}`)
    })

let step = 0

times(2, 6, 1000)
    .then(data1 => {
        step = 2
        return devide(data1, 3, 1000)
    })
    .then(data2 => {
        step = 3
        return devide(data2, 0, 1000)  // 故意出错
    })
    .then(data3 => {
        step = 4
        return devide(data3, 2, 1000)
    })
    .then(data4 => {
        console.log("最终结果:", data4)
    })
    .catch(error => {
        console.log(`第${step}步出错了:`, error)  // 只会触发一次
    })