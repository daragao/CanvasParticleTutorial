function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
  this.color = 'rgb('+Math.floor(Math.random()*255)+','+
      Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
  this.size = Math.random();
}

Particle.prototype.move = function () {
  // Add our current acceleration to our current velocity
  this.velocity.add(this.acceleration);

  // Add our current velocity to our position
  this.position.add(this.velocity);
};

Particle.prototype.draw = function() {
    // Set the color of our particles
    ctx.fillStyle = this.color;

    var position = this.position;

    // Draw a square at our position [particleSize] wide and tall
    ctx.fillRect(position.x, position.y, this.size, this.size);
};


Particle.prototype.submitToFields = function (fields) {
  // our starting acceleration this frame
  var totalAccelerationX = 0;
  var totalAccelerationY = 0;

  // for each passed field
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];

    // find the distance between the particle and the field
    var vectorX = field.position.x - this.position.x;
    var vectorY = field.position.y - this.position.y;

    // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
    var force = field.mass / Math.pow(vectorX*vectorX+vectorY*vectorY,1.5);

    // add to the total acceleration the force adjusted by distance
    totalAccelerationX += vectorX * force;
    totalAccelerationY += vectorY * force;
  }

  // update our particle's acceleration
  this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
};

