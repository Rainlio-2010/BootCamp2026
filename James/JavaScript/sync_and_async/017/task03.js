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

async function calculate(t) {
    const a = await (times(2, 3, 2000))
    try {
        const b = await (devide(a, t, 2000))
        console.log(b)

    } catch (error) {
        console.log(error.message)
    }
}

calculate(3)
calculate(0)