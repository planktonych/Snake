window.onload = function () /*fonction d'affichage de la fenêtre de jeux à l'ouverture de la page html.*/ {
    let canvasWidth = 900;
    let canvasHeight = 540;
    let blockSize = 60;
    let ctx;
    let delay = 200;
    let snakee;
    let applee;
    let widthInBlocks = canvasWidth / blockSize;
    let heightInBlocks = canvasHeight / blockSize;
    let score;
    let timeout;
    let imageSnakeBlock;
    let imageApple;
    const initApplePos = [5, 5];

    init();

    function init() {

        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px outset rgba(0,0,0,.8)";        
        canvas.style.margin = "0 auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "rgba(50, 50, 50, .5)";
        document.body.appendChild(canvas); 
        ctx = canvas.getContext('2d'); 
        snakee = new Snake([
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4]
        ], "right");
        applee = new Apple(initApplePos);
        score = 0;
        //load from image url
        imageSnakeBlockMiddle = new Image();
        imageSnakeBlockMiddle.src = "Pictures/SnakeMiddle.png";
        imageSnakeBlockHead = new Image();
        imageSnakeBlockHead.src = "Pictures/SnakeHead.png";
        imageSnakeBlockTail = new Image();
        imageSnakeBlockTail.src = "Pictures/SnakeTail.png";
        imageApple = new Image();
        imageApple.src = "Pictures/apple.png";
        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee));
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(refreshCanvas, delay); /* pour refresh une fonction après un délai passé */
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "rgba(210,210,210,.9)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        let centreX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        const gameOverText = "Рыба!";
        ctx.strokeText(gameOverText, centreX, centerY - 180);
        ctx.fillText(gameOverText, centreX, centerY - 180);
        ctx.font = "bold 50px sans-serif";
        const repeatText = "Пробел - еще по одной";
        ctx.strokeText(repeatText, centreX, centerY - 120);
        ctx.fillText(repeatText, centreX, centerY - 120);
        ctx.restore();
    }

    function restart() {
        snakee = new Snake([
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4]
        ], "right");
        applee = new Apple(initApplePos);
        score = 0;
        clearTimeout(timeout);
        refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "rgba(0,0,0,.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let centreX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centerY);
        ctx.restore();
    }

    function drawBlock(ctx, position, blockType, angle) {
        angle -= Math.PI / 2;
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        let imageSnakeBlock;
        switch (blockType) {
            case "head":
                imageSnakeBlock = imageSnakeBlockHead;
                break;
            case "tail":
                imageSnakeBlock = imageSnakeBlockTail;
                break;
            default:
                imageSnakeBlock = imageSnakeBlockMiddle;
        }

        console.log(angle);
        ctx.save();
        ctx.translate(x + blockSize / 2, y + blockSize / 2);
        ctx.rotate(angle);
        ctx.translate(-(x + blockSize / 2), -(y + blockSize / 2));
        ctx.drawImage(imageSnakeBlock, x , y, blockSize, blockSize);
        ctx.restore();                
        
                
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ffcc33";
            for (let i = 0; i < this.body.length; i++) {
                let blockType;
                if (i === 0) {
                    blockType = "head";
                } else if (i === this.body.length - 1) {
                    blockType = "tail";
                } else {
                    blockType = "middle";
                }
                let angle = 0;
                if (i > 0) {
                    let previousBlock = this.body[i - 1];
                    let currentBlock = this.body[i];
                    if (previousBlock[0] === currentBlock[0] && previousBlock[1] < currentBlock[1]) {
                        angle = Math.PI / 2;
                    } else if (previousBlock[0] === currentBlock[0] && previousBlock[1] > currentBlock[1]) {
                        angle = -Math.PI / 2;
                    } else if (previousBlock[0] < currentBlock[0] && previousBlock[1] === currentBlock[1]) {
                        angle = 0;
                    } else if (previousBlock[0] > currentBlock[0] && previousBlock[1] === currentBlock[1]) {
                        angle = Math.PI;
                    } 
                }
                else {
                    switch (this.direction) {
                        case "left":
                            angle = 0;
                            break;
                        case "right":
                            angle = Math.PI;
                            break;
                        case "down":
                            angle = -Math.PI / 2;
                            break;
                        case "up":
                            angle = Math.PI / 2;
                            break;
                        default:
                            throw ("Invalid Direction");
                    }
                }

                drawBlock(ctx, this.body[i], blockType, angle);
            }
            ctx.restore();
        };

        this.advance = function () {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };

        this.setDirection = function (newDirection) {
            let allowedDirection;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw ("Invalid Direction");
            }
            if (allowedDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function () {
            let wallCollision = false;
            let snakeCollision = false;
            let head = this.body[0];
            let rest = this.body.slice(1);
            let snakeX = head[0];
            let snakeY = head[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlocks - 1;
            let maxY = heightInBlocks - 1;
            let isNoteBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            let isNoteBetweenVerticalwalls = snakeY < minY || snakeY > maxY;

            if (isNoteBetweenHorizontalWalls || isNoteBetweenVerticalwalls) {
                wallCollision = true;
            }

            for (let i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function (appleToEat) {
            let head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();            
            let x = this.position[0] * blockSize;
            let y = this.position[1] * blockSize;
            ctx.drawImage(imageApple, x, y, blockSize, blockSize);                        
            ctx.restore();
        };

        this.setNewPosition = function () {
            let newX = Math.round(Math.random() * (widthInBlocks - 1));
            let newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };

        this.isOnSnake = function (snakeToCheck) {
            let isOnSnake = false;

            for (let i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        let key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 32:
                restart();
                return;
            default:
                return;

        };
        snakee.setDirection(newDirection);
    }
}