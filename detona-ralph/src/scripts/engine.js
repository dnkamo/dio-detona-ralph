const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        previousSquare: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countdown, 1000),
    }
};

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function loseLive() {
    state.values.lives--;
    state.view.lives.textContent = `x${state.values.lives}`
    if (state.values.lives < 0){
        state.values.lives = 0;
    }
}

function countdown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0 || state.values.lives <= 0){
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi " + state.values.result);
        gameRestart();
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    while(randomNumber === state.values.previousSquare){
        randomNumber = Math.floor(Math.random() * 9)
    }

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    state.values.previousSquare = randomNumber;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.hitResult = true
                state.values.result++;
                state.values.currentTime++;
                state.view.timeLeft.textContent = state.values.currentTime;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                loseLive();
                state.values.hitPosition = null;
            }
        })
    });
}

function resetValues(){
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.hitPosition = 0;
    state.values.previousSquare = 0;
    state.values.lives = 3;
    state.actions.timerId = setInterval(randomSquare, 1000),
    state.actions.countdownTimerId = setInterval(countdown, 1000)
    state.view.lives.textContent = `x${state.values.lives}`;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
}

function gameRestart(){
    resetValues();
}

function initialize() {
    addListenerHitBox();
}

initialize();