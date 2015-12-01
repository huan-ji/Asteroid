(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: Ship.VEL, radius: Ship.RADIUS, color: Ship.COLOR});
  };

  Ship.COLOR = "#0000FF";
  Ship.RADIUS = 20;
  Ship.VEL = [0, 0];

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function(game) {
    this.pos = game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    // impulse is a two-element vector.
    // Right -> [1, 0]
    // Left -> [-1, 0]
    // Up ->
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.bulletVel = function() {
    var xSign = this.vel[0] / Math.abs(this.vel[0]);
    var ySign = this.vel[1] / Math.abs(this.vel[1]);
    var squaredX = Math.pow(this.vel[0], 2);
    var squaredY = Math.pow(this.vel[1], 2);
    var ratio = 100 / Math.sqrt(squaredX + squaredY);
    if (isNaN(xSign)) { xSign = 1 };
    if (isNaN(ySign)) { ySign = 1 };
    var x = Math.sqrt(squaredX * ratio) * xSign;
    var y = Math.sqrt(squaredY * ratio) * ySign;
    return [x, y]
  }

  Ship.prototype.fire = function() {
    return new Asteroids.Bullet ({ pos: this.pos, vel: this.bulletVel() });
  };

})();
