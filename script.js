let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let ballRadius = 7;
let x = canvas.width/5;
let y = canvas.height-20;
let dx = 4;
let dy = -4;
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightClick = false;
let leftClick = false;
let brickRowCount = 7;
let brickColumnCount = 2;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives  = 3;

let bricks = [];
for(let a = 0; a < brickColumnCount; a++) {
    bricks[a] = [];
    for(let b = 0; b < brickRowCount; b++) {
        bricks[a][b] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(p) {
    let relativeX = p.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}



function keyDownHandler(p) {
    if(p.key == "Right" || p.key == "ArrowRight") {
        rightClick = true;
    }else if(p.key == "Left" || p.key == "ArrowLeft") {
        leftClick = true;
    }
}

function keyUpHandler(p) {
    if(p.key == "Right" || p.key == "ArrowRight") {
        rightClick = false;
    }else if(p.key == "Left" || p.key == "ArrowLeft") {
        leftClick = false;
    }
}

function collisionDetection() {
    for( let a = 0; a < brickColumnCount; a++) {
        for( let b = 0; b < brickRowCount; b++) {
            let c = bricks[a][b];
            if(c.status == 1) {
                if(x > c.x && x < c.x + brickWidth && y > c.y && y < c.y + brickHeight) {
                    dy = -dy;
                    c.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount) {
                        alert("WINNER WINNER CHICKEN DINNER!!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    context.font = "16 px sans-serif";
    context.fillStyle = "#f2f4f5";
    context.fillText("Score:" + score, 8, 20);
}

function drawLives() {
    context.font = "16 px sans-serif";
    context.fillStyle = "#f2f4f5";
    context.fillText("Lives:" + lives, canvas.width -65, 20);
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#f2f4f5";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight - 10, paddleWidth, paddleHeight);
    context.fillStyle = "#f2f4f5c";
    context.fill();
    context.closePath();

}

function drawBricks() {
    for(let a = 0; a < brickColumnCount; a++) {
        for(let b = 0; b < brickRowCount; b++) {
            if(bricks[a][b].status == 1) {
            let brickX = (b*(brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (a*(brickHeight + brickPadding)) + brickOffsetTop;
            bricks[a][b].x = brickX;
            bricks[a][b].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#f2f4f5";
            context.fill();
            context.closePath();
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
            
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(y = y-paddleHeight){
                dy = -dy;
            }
        }else{
            lives --;
            if(!lives) {
                alert("GAME OVER!!");
            document.location.reload();
        }else{
            x = canvas.width / 2;
            y = canvas.height -30;
            dx = 4;
            dy = -4;
            paddleX = (canvas.width-paddleWidth) / 2;
            }
        }
    }
           
    if(rightClick && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
        }else if (leftClick && paddleX > 0) {
            paddleX -= 7;
    }
    
    x += dx;
    y += dy; 
    requestAnimationFrame(draw);
}
    
draw();