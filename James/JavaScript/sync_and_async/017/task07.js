const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Hello"), ms));

async function times(a, b, delay = 2000) {
    await (wait(delay))
    return result = a * b
}

async function devide(a, b, delay = 2000) {

    await (wait(delay))
    if (b === 0) throw new Error("b不能是0")
    return result = a / b
}

async function calculate() {
    try {
        const a = await (times(3, 5, 2000))
        console.log(a)
        const b = await (devide(a, 2, 2000))
        console.log(b)
        const c = await (devide(b, 0, 2000))
        console.log(c)

    } catch (error) {
        console.log(error.message)
    }
}

calculate()
