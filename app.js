let currentPlayer = "X";
let arr = Array(9).fill(null);
let gameOver = false;

function checkGameStatus() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
            showMessage(`🎉 Winner is ${arr[a]}!`);
            gameOver = true;
            return;
        }
    }

    if (!arr.includes(null)) {
        showMessage("😅 It's a draw!");
        gameOver = true;
    }
}

function handleclick(ele) {
    if (gameOver) return;

    const id = Number(ele.id);
    if (arr[id] !== null) return;

    arr[id] = currentPlayer;
    ele.innerText = currentPlayer;
    ele.classList.add(currentPlayer); // styling class

    checkGameStatus();

    if (!gameOver) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    console.log(arr);
}

function showMessage(msg) {
    let msgBox = document.getElementById("message");
    if (!msgBox) {
        msgBox = document.createElement("div");
        msgBox.id = "message";
        msgBox.style.cssText = `
            margin-top: 20px;
            font-size: 40px;
            font-weight: bold;
            color: #333;
            text-align: center;
        `;
        document.body.appendChild(msgBox);
    }
    msgBox.textContent = msg;
}
