

// const ButtonArray = [
//     { Box: Col0, Statue: null },
//     { Box: Col1, Statue: null },
//     { Box: Col2, Statue: null },
//     { Box: Col3, Statue: null },
//     { Box: Col4, Statue: null },
//     { Box: Col5, Statue: null },
//     { Box: Col6, Statue: null },
//     { Box: Col7, Statue: null },
//     { Box: Col8, Statue: null },
// ]
// for (let i = 0; i < ButtonArray.length; i++) {
//     i.addEventLisenter

// }

let borderElements = []
const board = [
    "", "", "", "", "", "", "", "", ""
]
let currentPlayer = "X"

for (let c = 0; c < 9; c++) {
    const element = document.getElementById(c.toString())
    borderElements.push(element)
    element.addEventListener("click", (event) => {
        const index = parseInt(event.target.id)

        let winner = calculateWinner(board)

        if (winner) {
            if (winner == "draw") {
                alert("it a draw")
            } else {
                alert(winner + "wins")
            }
            resetGame();
            return
        }
        if (board[index] === "") {
            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (currentPlayer === "X") {
                currentPlayer = "O"
            } else {
                currentPlayer = "X"
            }
        }
        console.log(calculateWinner(board))
    });
}
for (x = 0; x < 9; x++) {
    const element = borderElements[x]
    element.innerText = board[x]
}

function resetGame() {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
        borderElements[i].textContent = "";
    }
    currentPlayer = "X";
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
        [0, 4, 8], [2, 4, 6]             // 斜向
    ];

    // 2. 遍历这些组合
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        // 如果第一个位置有棋子，且与后面两个位置的棋子相同
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // 返回胜者 ('X' 或 'O')
        }
    }

    // 3. 如果没有胜者，检查是否平局或游戏继续
    return squares.includes("") ? null : 'Draw';
}