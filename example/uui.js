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


    var hammertime = new Hammer(canvas);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('swipeleft', function(ev) {
        console.log(ev);
        console.log("SWIPED LEFT");
        dogImg=personImg;
    });
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //drawStuff();
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

    draw_width = image_width;
    draw_height = image_height;

    if(image_width > canvas_width){
        ratio = canvas_width / image_width;   // get ratio for scaling image
        draw_width = canvas_width; // Set new width
        draw_height = image_height * ratio;  // Scale height based on ratio
        image_height = image_height * ratio;    // Reset height to match scaled image
        image_width = image_width * ratio;    // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if(image_height > canvas_height){
        ratio = canvas_height / image_height; // get ratio for scaling image
        draw_height = canvas_height;   // Set new height
        draw_width = image_width * ratio;    // Scale width based on ratio
        image_width = image_width * ratio;    // Reset width to match scaled image
        image_height = image_height * ratio;    // Reset height to match scaled image
    }

    xoffset = (canvas_width  / 2 ) - ( image_width / 2);
    yoffset = (canvas_height / 2 ) - (image_height / 2)
    context.drawImage(img, xoffset, 0, draw_width, draw_height);
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
