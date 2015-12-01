(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: Asteroids.Util.randomVec(Asteroid.VELOCITY), radius: Math.random() * 40 + 20 , color: Asteroid.COLOR});
  }

  Asteroid.COLOR = "#00FF00";
  Asteroid.VELOCITY = 1;

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
