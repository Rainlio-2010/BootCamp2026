const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Hello"), ms));

async function times(a, b, delay = 2000) {
    await (wait(delay))
    return result = a * b
}

async function calculate() {
    const a = await (times(2, 3, 2000))
    console.log(a)

}

calculate()







// async function devide(a, b, delay = 2000) {
//     try {
//         await (wait(delay))
//         let result
//         return result = a / b
//     } catch (err) {
//         console.log("b 不能是0")
//     }
// }