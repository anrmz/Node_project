const boardEl = document.querySelector('.board');
const scoreEl = document.querySelector('.score');

let score = 0;
let direction = 'right';
let GAME_SPEED = 70;
let BOARD_SIZE = 30;

let isFood = false;

let foodPosition = {
    x: 0,
    y: 0
}

let snakePosition = [];


const changeDirection = (e) => {
    const newDirection = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
    }[e.key];

    if (newDirection) {
      
        if (snakePosition.length > 1) {
            if ((newDirection === 'up' && direction === 'down') ||
                (newDirection === 'down' && direction === 'up') ||
                (newDirection === 'left' && direction === 'right') ||
                (newDirection === 'right' && direction === 'left')) {
                return; 
            }
        }

        direction = newDirection;
    }
}

const randomizeGridPosition = () => {
    const randX = Math.floor(Math.random() * 30) + 1;
    const randY = Math.floor(Math.random() * 30) + 1;

    return {randX, randY}
}

const generateFood = () => {
    const food = document.createElement('div');
    food.classList.add('food');

    const {randX, randY} = randomizeGridPosition();

    food.style.gridRowStart = randX;
    food.style.gridColumnStart = randY;

    foodPosition.x = randX;
    foodPosition.y = randY;

    boardEl.appendChild(food);
    isFood = true;
}

const moveSnake = (snakeHead) => {
    const prevHeadPos = {
        row: parseInt(snakeHead.style.gridRowStart),
        col: parseInt(snakeHead.style.gridColumnStart)
    };
  
    switch (direction) {
        case 'right':
            snakeHead.style.gridColumnStart = parseInt(snakeHead.style.gridColumnStart) + 1;
            break;
        case 'left':
            snakeHead.style.gridColumnStart = parseInt(snakeHead.style.gridColumnStart) - 1;
            break;
        case 'up':
            snakeHead.style.gridRowStart = parseInt(snakeHead.style.gridRowStart) - 1;
            break;
        case 'down':
            snakeHead.style.gridRowStart = parseInt(snakeHead.style.gridRowStart) + 1;
            break;
    }


    for (let i = snakePosition.length - 1; i > 0; i--) {
        if (i === 1) { 
            snakePosition[i].style.gridColumnStart = prevHeadPos.col;
            snakePosition[i].style.gridRowStart = prevHeadPos.row;
        } else {
            snakePosition[i].style.gridColumnStart = snakePosition[i - 1].style.gridColumnStart;
            snakePosition[i].style.gridRowStart = snakePosition[i - 1].style.gridRowStart;
        }
    }
}

const eatFood = (snakeHead) => {
    if(+snakeHead.style.gridRowStart === foodPosition.x && +snakeHead.style.gridColumnStart === foodPosition.y) {
        const food = document.querySelector('.food');
        food.remove();

        score++;

        generateFood();

        appendTail(snakeHead);

        scoreEl.textContent = `score: ${score}`;
    }
}

const appendTail = (snakeHead) => {
    const snakeTail = document.createElement('div');
    snakeTail.classList.add('snake-tail');

    const headX = +snakeHead.style.gridRowStart;
    const headY = +snakeHead.style.gridColumnStart;

    switch (direction) {
        case 'right':
            snakeTail.style.gridRowStart = headX;
            snakeTail.style.gridColumnStart = headY - 1;
            break;
        case 'left':
            snakeTail.style.gridRowStart = headX;
            snakeTail.style.gridColumnStart = headY + 1;
            break;
        case 'up':
            snakeTail.style.gridRowStart = headX + 1;
            snakeTail.style.gridColumnStart = headY;
            break;
        case 'down':
            snakeTail.style.gridRowStart = headX - 1;
            snakeTail.style.gridColumnStart = headY;
            break;
    }

    boardEl.appendChild(snakeTail);

    snakePosition.push(snakeTail);
}

const gameTicker = (snakeHead) => {
    const interval = setInterval(() => {
        moveSnake(snakeHead);

        snakePosition[0] = snakeHead;

        eatFood(snakeHead);

        if(!isFood) {
            generateFood();
        }

        if(checkCollision()) {
            alert('Game Over');
            clearInterval(interval);
            return
        }

    }, GAME_SPEED)
}

const checkCollision = () => {
    const headX = parseInt(snakePosition[0].style.gridRowStart);
    const headY = parseInt(snakePosition[0].style.gridColumnStart);

    for (let i = 1; i < snakePosition.length; i++) {
        const tailX = parseInt(snakePosition[i].style.gridRowStart);
        const tailY = parseInt(snakePosition[i].style.gridColumnStart);

        if (headX === tailX && headY === tailY) {
            return true;
        }
    }

    if (headX < 1 || headX > BOARD_SIZE || headY < 1 || headY > BOARD_SIZE) {
        return true;
    }

    return false;
}


const init = () => {
    const snakeHead = document.createElement('div');
    snakeHead.classList.add('snake-head');
    
    
    const {randX, randY} = randomizeGridPosition();
    
    snakeHead.style.gridRowStart = randX;
    snakeHead.style.gridColumnStart = randY;    
    boardEl.appendChild(snakeHead);
    
    score = 0;

    gameTicker(snakeHead);
}


document.addEventListener('keydown', (e) => {
    changeDirection(e);
})

document.addEventListener('DOMContentLoaded', () => {
    init(); 
});