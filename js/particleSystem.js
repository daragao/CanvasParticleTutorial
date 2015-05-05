function Field(point, mass) {
  this.position = point;
  this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? "#f00" : "#0f0";
};

function Emitter(point, velocity, spread) {
  this.position = point; // Vector
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.drawColor = "#999"; // So we can tell them apart from Fields later
}

Emitter.prototype.emitParticle = function() {
  // Use an angle randomized over the spread so we have more of a "spray"
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  // The magnitude of the emitter's velocity
  var magnitude = this.velocity.getMagnitude();

  // The emitter's position
  var position = new Vector(this.position.x, this.position.y);

  // New velocity based off of the calculated angle and magnitude
  var velocity = Vector.fromAngle(angle, magnitude);

  // return our new Particle!
  return new Particle(position,velocity);
};

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that has a mass of `-140`
//var fields = [new Field(new Vector(400, 230), -140)];

var particles = [];

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
//var emitters = [new Emitter(new Vector(100, 230), Vector.fromAngle(0, 2))];


var midX = window.innerWidth/2;
var midY = window.innerHeight/2;
var emitters = [
  new Emitter(new Vector(midX - 150, midY), Vector.fromAngle(6, 2), Math.PI)
];

var fields = [
  new Field(new Vector(midX - 300, midY + 20), 900),
  new Field(new Vector(midX - 200, midY + 10), -50),
];




var maxParticles = 20000; // experiment! 20,000 provides a nice galaxy
var emissionRate = 40; // how many particles are emitted each frame

function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length > maxParticles) return;

  // for each emitter
  for (var i = 0; i < emitters.length; i++) {

    // for [emissionRate], emit a particle
    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    }

  }
}

function plotParticles(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;

    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    // Update velocities and accelerations to account for the fields
    particle.submitToFields(fields);

    // Move our particles
    particle.move();

    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }

  // Update our global particles, clearing room for old particles to be collected
  particles = currentParticles;
}


var particleSize = 1;

function drawParticles() {

  // For each particle
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

// `object` is a field or emitter, something that has a drawColor and position
function drawCircle(object) {
    var objectSize = 5;
  ctx.fillStyle = object.drawColor;
  ctx.beginPath();
  ctx.arc(object.position.x, object.position.y, objectSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

