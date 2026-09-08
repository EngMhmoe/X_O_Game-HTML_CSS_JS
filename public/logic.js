/* ==============================================================
   Game Elements
   ============================================================== */

const cells = document.querySelectorAll(".cell");

const turnText = document.getElementById("turnText");

const turnDot = document.querySelector(".turn-dot");

const playerXCard = document.getElementById("playerXCard");

const playerOCard = document.getElementById("playerOCard");

const scoreXElement = document.getElementById("scoreX");

const scoreOElement = document.getElementById("scoreO");

const resultPanel = document.getElementById("resultPanel");

const resultIcon = document.getElementById("resultIcon");

const resultTitle = document.getElementById("resultTitle");

const resultMessage = document.getElementById("resultMessage");

const playAgainButton = document.getElementById("playAgainButton");

const newGameButton = document.getElementById("newGameButton");


/* ==============================================================
   Game State
   ============================================================== */

let currentPlayer = "X";

let gameActive = true;

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let scoreX = 0;

let scoreO = 0;


/* ==============================================================
   Winning Combinations
   ============================================================== */

const winningCombinations = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]

];


/* ==============================================================
   Cell Events
   ============================================================== */

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        const index = Number(cell.dataset.index);

        handleMove(index);

    });

});


/* ==============================================================
   Handle Move
   ============================================================== */

function handleMove(index) {

    /* ==========================================================
       Validate Game
       ========================================================== */

    if (!gameActive) {
        return;
    }


    /* ==========================================================
       Validate Cell
       ========================================================== */

    if (
        index < 0 ||
        index >= board.length ||
        board[index] !== ""
    ) {

        return;

    }


    /* ==========================================================
       Save Move
       ========================================================== */

    board[index] = currentPlayer;


    /* ==========================================================
       Update Cell
       ========================================================== */

    const cell = cells[index];

    cell.textContent = currentPlayer;

    cell.classList.add(
        "filled",
        currentPlayer.toLowerCase(),
        "marked"
    );


    /* ==========================================================
       Check Winner
       ========================================================== */

    const result = checkWinner();


    if (result) {

        finishGame(result);

        return;

    }


    /* ==========================================================
       Check Draw
       ========================================================== */

    if (checkDraw()) {

        finishDraw();

        return;

    }


    /* ==========================================================
       Switch Player
       ========================================================== */

    switchPlayer();

}


/* ==============================================================
   Check Winner
   ============================================================== */

function checkWinner() {

    for (
        const combination of winningCombinations
    ) {

        const [
            first,
            second,
            third
        ] = combination;


        if (

            board[first] !== "" &&

            board[first] === board[second] &&

            board[second] === board[third]

        ) {

            return {

                player: board[first],

                combination: combination

            };

        }

    }


    return null;

}


/* ==============================================================
   Check Draw
   ============================================================== */

function checkDraw() {

    return board.every(function (cell) {

        return cell !== "";

    });

}


/* ==============================================================
   Finish Game
   ============================================================== */

function finishGame(result) {

    gameActive = false;


    /* ==========================================================
       Highlight Winning Cells
       ========================================================== */

    result.combination.forEach(function (index) {

        cells[index].classList.add("winner");

    });


    /* ==========================================================
       Update Score
       ========================================================== */

    if (result.player === "X") {

        scoreX++;

        scoreXElement.textContent = scoreX;

    } else {

        scoreO++;

        scoreOElement.textContent = scoreO;

    }


    /* ==========================================================
       Result Content
       ========================================================== */

    resultIcon.textContent = "✓";

    resultTitle.textContent =
        `Player ${result.player} Wins!`;

    resultMessage.textContent =
        "Excellent move! Ready for another round?";


    /* ==========================================================
       Result Color
       ========================================================== */

    if (result.player === "X") {

        resultIcon.style.color =
            "var(--x-color)";

        resultIcon.style.background =
            "rgba(163, 255, 74, 0.1)";

    } else {

        resultIcon.style.color =
            "var(--o-color)";

        resultIcon.style.background =
            "rgba(79, 140, 255, 0.1)";

    }


    /* ==========================================================
       Show Result
       ========================================================== */

    resultPanel.classList.add("show");

}


/* ==============================================================
   Finish Draw
   ============================================================== */

function finishDraw() {

    gameActive = false;


    /* ==========================================================
       Result Content
       ========================================================== */

    resultIcon.textContent = "≡";

    resultIcon.style.color =
        "var(--text-primary)";

    resultIcon.style.background =
        "rgba(255, 255, 255, 0.08)";


    resultTitle.textContent =
        "It's a Draw!";

    resultMessage.textContent =
        "No winner this time. Give it another shot!";


    /* ==========================================================
       Show Result
       ========================================================== */

    resultPanel.classList.add("show");

}


/* ==============================================================
   Switch Player
   ============================================================== */

function switchPlayer() {

    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    updateTurnUI();

}


/* ==============================================================
   Update Turn UI
   ============================================================== */

function updateTurnUI() {

    turnText.textContent =
        `Player ${currentPlayer}`;


    /* ==========================================================
       X Turn
       ========================================================== */

    if (currentPlayer === "X") {

        turnDot.style.background =
            "var(--x-color)";

        turnDot.style.boxShadow =
            "0 0 12px var(--x-color)";


        playerXCard.classList.add("active");

        playerOCard.classList.remove("active");

    }


    /* ==========================================================
       O Turn
       ========================================================== */

    else {

        turnDot.style.background =
            "var(--o-color)";

        turnDot.style.boxShadow =
            "0 0 12px var(--o-color)";


        playerOCard.classList.add("active");

        playerXCard.classList.remove("active");

    }

}


/* ==============================================================
   Play Again
   ============================================================== */

playAgainButton.addEventListener(
    "click",
    function () {

        resetBoard();

    }
);


/* ==============================================================
   New Game
   ============================================================== */

newGameButton.addEventListener(
    "click",
    function () {

        scoreX = 0;

        scoreO = 0;

        scoreXElement.textContent = "0";

        scoreOElement.textContent = "0";

        resetBoard();

    }
);


/* ==============================================================
   Reset Board
   ============================================================== */

function resetBoard() {

    /* ==========================================================
       Reset State
       ========================================================== */

    currentPlayer = "X";

    gameActive = true;

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    /* ==========================================================
       Reset Cells
       ========================================================== */

    cells.forEach(function (cell) {

        cell.textContent = "";

        cell.className = "cell";

    });


    /* ==========================================================
       Hide Result
       ========================================================== */

    resultPanel.classList.remove("show");


    /* ==========================================================
       Reset Turn
       ========================================================== */

    updateTurnUI();

}