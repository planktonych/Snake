window.onload = function () /*fonction d'affichage de la fenêtre de jeux à l'ouverture de la page html.*/
{
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30
    let ctx;
    let delay = 100;
    let snakee;
    let applee;

    init();

    function init()
    {

        let canvas = document.createElement('canvas'); /*fonction canvas pour faire apparaitre une zone interactive (déssin) sur son HTML.*/
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas); /*Appelation du canvas dans le body*/
        ctx = canvas.getContext('2d');/* variable pour le contexte de notre canvas '2d'*/
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        applee = new Apple([10,10]);
        refreshCanvas();
    }

    function refreshCanvas()
    {
        ctx.clearRect(0,0,canvasWidth,canvasHeight);/* pour effacer une zone que l'on souhaite */
        /*ctx.fillRect(xCoord, yCoord, 100, 50); les deux premières valeurs sont le positionnement horizontal et vertical.
            Les deux autres sont la dimension de notre dessin comme là un rectangle de 100 px sur 50 px.*/
        snakee.advance();
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);/* pour refresh une fonction après un délai passé */
    }

    function drawBlock(ctx, position)
    {
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);/* les deux premières valeurs sont le positionnement horizontal et vertical.
        Les deux autres sont la dimension de notre dessin comme là un rectangle de 100 px sur 50 px.*/

    }

    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance= function()
        {
            let nextPosition = this.body[0].slice();
            switch(this.direction)
            {
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
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            this.body.pop()
        };
        this.setDirection = function(newDirection)
        {
            let allowedDirection;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");
            }
            if (allowedDirection.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };
    }

    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            let radius = blockSize/2;
            let x = position[0]*blockSize + radius;
            let y = position[1]*blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        }
    }

    document.onkeydown = function handleKeyDown(e)
    {
        let key = e.keyCode;
        let newDirection;
        switch(key)
        {
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
            default:
                return;

        }
    snakee.setDirection(newDirection);
    }
}