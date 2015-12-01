(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: params.vel, radius: Bullet.RADIUS, color: Bullet.COLOR});
  };

  Bullet.COLOR = "#0000FF";
  Bullet.RADIUS = 5;

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

})();
