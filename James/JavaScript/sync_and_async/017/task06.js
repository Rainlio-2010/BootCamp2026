const numbers = [1, 2, 3, 4]
const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Hello"), ms));


async function aaaa() {
    for (const item of numbers) {
        await (wait(2000))
        console.log(item * 2)
    }
}

aaaa()