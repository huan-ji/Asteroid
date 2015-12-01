(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.radius = object.radius;
    this.color = object.color;
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.outOfBounds = function(game) {
    var x = this.pos[0];
    var y = this.pos[1];
    if (x > game.xDim || y > game.yDim || x < 0 || y < 0) {
      return true;
    } else {
      return false;
    }
  }

  MovingObject.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };
})();
