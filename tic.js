let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-winner");
let msg = document.querySelector("#msg");

let turn0 = true; // for O turn 
let gameActive = true; // Variable to track game status

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && gameActive) {
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.setAttribute("aria-disabled", "true");
            checkWinner();  
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.setAttribute("aria-disabled", "true");
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.removeAttribute("aria-disabled");
        box.innerText = "";
    });
};

const showWinner = (winner) => {
   msg.innerText = `Congratulations, Winner is ${winner}`;
   msgContainer.classList.remove("hide");
   gameActive = false; // Deactivate the game
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log(`Winner: ${pos1val}`);
            showWinner(pos1val);
            return;
        }
    }
};

const resetGame = () => {
    enableBoxes();
    turn0 = true;
    gameActive = true; // Reactivate the game
    msgContainer.classList.add("hide");
};

const startNewGame = () => {
    resetGame();
    let start = prompt("Who starts first? Enter 'O' or 'X'");
    if (start === "X" || start === "x") {
        turn0 = false; // X's turn
    } else {
        turn0 = true; // O's turn
    }
};

rstbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", startNewGame);
