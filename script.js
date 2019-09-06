window.onload = function () /*fonction d'affichage de la fenêtre de jeux à l'ouverture de la page html.*/
{
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30
    let ctx;
    let delay = 100;
    let xCoord = 0;
    let yCoord = 0;

    init();

    function init()
    {

        canvas = document.createElement('canvas'); /*fonction canvas pour faire apparaitre une zone interactive (déssin) sur son HTML.*/
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas); /*Appelation du canvas dans le body*/
        ctx = canvas.getContext('2d');/* variable pour le contexte de notre canvas '2d'*/
        refreshcanvas();
    }

    function refreshcanvas()
    {
        xCoord += 5;
        yCoord += 5;
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 50); /* les deux premières valeurs sont le positionnement horizontal et vertical.
            Les deux autres sont la dimension de notre dessin comme là un rectangle de 100 px sur 50 px.*/
        setTimeout(refreshcanvas,delay);
    }
}
