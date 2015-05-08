var canvas, context;
var circlex = 0;
var circley = 0;
var imageCollection;
var dogImg;
var resizeTimerID = 0;

function InitUUI()
{
    canvas = document.getElementById('mainCanvas');
    context = canvas.getContext('2d');
    imageCollection = document.getElementById('imageCollection');
    dogImg = loadImage("image.jpg");
    personImg = loadImage("http://i.imgur.com/i2dYpM3.jpg");
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    drawStuff(); /* start animation loop */
}


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStuff();
    /*
    if (resizeTimerID != 0) {
        clearTimeout(resizeTimerID);
    }
    resizeTimerID = setTimeout(
        function()
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },
         50);

    * Your drawings need to be inside this function otherwise they will be reset when
    * you resize the browser window and the canvas goes will be cleared.
    */
}

function loadImage(imgSrc) {
    var DOM_img = document.createElement("img");
    DOM_img.src = imgSrc;//"typo3conf/ext/ori_proyectos/res/images/interes.png";
    DOM_img.style.display = "none";
    //DOM_img.id = "puppy";
    imageCollection.appendChild(DOM_img);
    return DOM_img;
}

function drawScaledImageToCanvas(img) {
    canvas_width = canvas.width;
    canvas_height = canvas.height;
    image_width = img.width;
    image_height = img.height;
    xScaleFactor = canvas_width / image_width;
    yScaleFactor = canvas_height / image_height;
    if (canvas_width < canvas_height)
    {
        draw_width = image_width * xScaleFactor;
        draw_height = image_height * yScaleFactor;
        
        //draw_width = image_width * (canvas_height / image_height);
        // do a height-constrained resize.
    }
    else
        {
            draw_width = 100;
            draw_height = 100;
        }
//else
    //{
        // do a height-constrained resize.
    //    draw_width = canvas_width;
//    draw_height = image_height * (canvas_width / image_width);
//    }
    context.drawImage(img, 0, 0, draw_width, draw_height);
}

function drawText(text) {
    context.fillStyle = 'black';
    context.font = "80px Georgia";
    // horizontally center text on canvas.
    text_width = context.measureText(text).width;
    context.fillText(text, (canvas.width / 2) - (text_width / 2), 60);
}

function drawStuff() {
    circlex += 1;
    circley += 1;
    drawScaledImageToCanvas(dogImg);
    //drawScaledImageToCanvas(personImg);
    drawText("HELLO, WORLD!");
    context.beginPath();
    context.arc(circlex, circley, 10, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    window.requestAnimationFrame(drawStuff); /* start event loop. */
}
