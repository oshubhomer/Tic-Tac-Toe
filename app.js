let currentPlayer = "X";
let arr = Array(9).fill(null);
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

function updateScore() {
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
}

function checkGameStatus() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (const pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
            showMessage(`🎉 ${arr[a]} Wins!`);
            winSound.play();
            arr[a] === "X" ? scoreX++ : scoreO++;
            updateScore();
            gameOver = true;
            return;
        }
    }

    if (!arr.includes(null)) {
        showMessage("😅 Draw Game!");
        drawSound.play();
        gameOver = true;
    }
}

function handleclick(ele) {
    if (gameOver) return;

    const id = Number(ele.id);
    if (arr[id] !== null) return;

    clickSound.play();
    arr[id] = currentPlayer;
    ele.innerText = currentPlayer;
    ele.classList.add(currentPlayer);

    checkGameStatus();

    if (!gameOver) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        showMessage(`Player ${currentPlayer} Turn`);
    }
}

function showMessage(msg) {
    document.getElementById("message").textContent = msg;
}

function resetGame() {
    arr.fill(null);
    gameOver = false;
    currentPlayer = "X";
    showMessage("Player X Turn");

    document.querySelectorAll(".col").forEach(box => {
        box.innerText = "";
        box.classList.remove("X", "O");
    });
}
