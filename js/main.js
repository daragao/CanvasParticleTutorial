var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gui = new dat.GUI();
gui.add(this,'emissionRate');
gui.add(this,'maxParticles');

function loop() {
    stats.begin();
    clear();
    update();
    draw();
    queue();
    stats.end();
}


function clear()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function queue()
{
    window.requestAnimationFrame(loop);
}

function update()
{
    addNewParticles();
    plotParticles(canvas.width, canvas.height);
}

function draw()
{
    drawParticles();
    fields.forEach(drawCircle);
    emitters.forEach(drawCircle);
}

loop();
