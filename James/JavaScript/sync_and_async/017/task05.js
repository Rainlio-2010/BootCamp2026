const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Hello"), ms));

async function times(a, b, delay = 2000) {
    await (wait(delay))
    return result = a * b
}


async function calculate() {
    const res1 = await Promise.all([
        times(2, 3, 2000),
        times(4, 5, 2000)
    ])
    console.log(res1[0])
    console.log(res1[1])
}

calculate()
