

var canvas;

function InitUUI()
{
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}


  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
    * Your drawings need to be inside this function otherwise they will be reset when
    * you resize the browser window and the canvas goes will be cleared.
    */
    drawStuff();
  }

  function drawStuff() {
    // do your drawing stuff here
  }
