const colors = ["blue", "green", "yellow", "red", "orange", "pink", "grey", "black", "indigo"];
const title = document.getElementById("titleColor");
const message = document.getElementById("message");
const maxTurns = 5;
const colorHeading = document.getElementById("colorH1");
const container = document.getElementsByClassName("container")[0];
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const div = document.getElementById('4');
let t, a;
let neededColor = randInt();
let d = new Date();
let mainCounter = 0;
let score = 0;
let start = false;

function main() {
    button.removeAttribute('disabled');
    neededColor = randInt();
    d = new Date();

    container.style.pointerEvents = "all";
    title.innerText = colors[neededColor];
    colorHeading.style.background = colors[neededColor];

    colorDivs();
    setListeners();
}

function setListeners() {
    let i;
    let div;
    for (i = 0; i < 9; i++) {
        div = document.getElementById(String(i));
        div.addEventListener("click", function () {
            if (this.style.background === colors[neededColor]) {
                score += new Date() - d;
                if (mainCounter < maxTurns - 1) startTimer();
                else {
                    resetColor();
                    showScore();
                    setTimeout(reset(), 3000);
                    toogleText();
                }
            } else {
                // score += 1000;
            }
        });
    }
}

function startTimer() {
    resetColor();
    let counter = 3;
    div.innerText = counter;
    t = setInterval(() => {
        counter--;
        div.innerText = counter;
        if (counter === 0) {
            clearTimeout(t);
            div.innerText = "";
            mainCounter++;
            if (mainCounter < maxTurns) {
                main();
            }
            else {
                showScore();
            }
        };
    }, 1000);
}

function colorDivs() {
    let n = randInt();
    let i;
    let div;
    const arr = [];
    for (i = 0; i < 9; i++) {
        div = document.getElementById(String(i));
        while (arr.includes(n)) n = randInt();
        div.style.background = colors[n];
        arr.push(n);
    }
}

function oneTimer() {
    let counter = 3;
    div.innerText = counter;
    t = setInterval(() => {
        counter--;
        div.innerText = counter;
        if (counter === 0) {
            clearTimeout(t);
            div.innerText = "";
        };
    }, 1000);
}

function resetColor() {
    resetElements();
    let i, div;
    for (i = 0; i < 9; i++) {
        div = document.getElementById(String(i));
        div.style.background = "#F0F0F0";
    }
    container.style.pointerEvents = "none";
}

function showScore() {
    modal.style.display = "block";
    message.innerText = `Average time is ${Math.floor(score / maxTurns)} milliseconds`;
}

function reset() {
    resetColor();
    clearTimeout(t);
    mainCounter = 0;
    score = 0;
}

function resetElements() {
    colorHeading.style.background = "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)";
    title.innerText = "Color";
    div.innerText = "";
}

function toogleText() {
    let button = document.getElementById("button");
    start = !start;
    if (start) {
        button.innerText = "reset";
        oneTimer();
        a = setTimeout(main, 3000);
    } else {
        console.log(a);
        clearTimeout(a);
        button.innerText = "start";
        reset();
    }
}
function fixTouch() {
    let button = document.getElementById("button");
    button.style.background = "white";
    button.style.color = "#12c2e9";
}
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function randInt() {
    return Math.floor(Math.random() * 9);
}

function notThis(num) {
    let i = randInt();
    while (i === num) i = randInt();
    return i;
}
