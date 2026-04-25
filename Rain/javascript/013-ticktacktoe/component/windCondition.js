export function calculateWinner(squares) {
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
    return squares.includes(null) ? null : 'Draw';
}