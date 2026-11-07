const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Hello"), ms));

async function main() {
    await wait(2000);
    console.log('word1');
}

function main2() {
    wait(2000).then(() => {
        console.log('word2');
    });
}

main();
main2();