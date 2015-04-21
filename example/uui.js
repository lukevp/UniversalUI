

var canvas;
var x = 0;
var y = 0;

function InitUUI()
{
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  drawStuff(); /* start animation loop */
}


  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
    * Your drawings need to be inside this function otherwise they will be reset when
    * you resize the browser window and the canvas goes will be cleared.
    */
    //drawStuff();
  }

  function drawStuff() {
    x += 2;
    y += 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#003300';
    context.stroke();
    window.requestAnimationFrame(drawStuff); /* start event loop. */
  }
