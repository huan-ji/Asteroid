(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.movingObjects = [];
    this.addAsteroids(Game.NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship ({pos: this.randomPosition() });
    this.movingObjects.push(this.ship);
    // var mo1 = new Asteroids.MovingObject({ pos: [0, 0], vel: [1.5, 1.8], radius: 10, color: "#00FF00" });
    // this.movingObjects.push(mo1);
  };

  Game.NUM_ASTEROIDS = 20;

  Game.prototype.remove = function(movingObject) {
    var index = this.movingObjects.indexOf(movingObject);
    this.movingObjects.splice(index, 1);
  }

  Game.prototype.checkCollisions = function() {
    var garbage = [];
    for(var i = 0; i < this.movingObjects.length - 1; i++) {
      for(var j = i + 1; j < this.movingObjects.length; j++) {
        obj1 = this.movingObjects[i];
        obj2 = this.movingObjects[j];
        obj1_x = obj1.pos[0];
        obj1_y = obj1.pos[1];

        obj2_x = obj2.pos[0];
        obj2_y = obj2.pos[1];

        distance = Math.sqrt(Math.pow(obj2_x - obj1_x, 2) + Math.pow(obj2_y - obj1_y, 2));
        if (distance < (obj1.radius + obj2.radius)) {
          if (obj2 instanceof Asteroids.Ship && obj1 instanceof Asteroids.Asteroid) {
            obj2.relocate(this);
          } else if ((obj1 instanceof Asteroids.Bullet && obj2 instanceof Asteroids.Asteroid) || (obj2 instanceof Asteroids.Bullet && obj1 instanceof Asteroids.Asteroid)){
            this.remove(obj1);
            this.remove(obj2);
          }

          // if (obj2 instanceof Asteroids.Ship) {
          //   obj2.relocate(this);
          //   this.remove(obj1);
          // } else {
          //   this.remove(obj1);
          //   this.remove(obj2);
          // }
        }
      }
    }
    // var that = this
    // garbage.forEach(function(element) {
    //   that.movingObjects[element] = null
    // })
    // newMovingObjects = []
    // this.movingObjects.forEach(function(element) {
    //   if (element !== null) {
    //     newMovingObjects.push(element);
    //   }
    // })
    // this.movingObjects = newMovingObjects;
  }

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x < 0) {
      x = this.xDim;
    } else if (x > this.xDim) {
        x = 0;
    }

    if (y < 0) {
      y = this.yDim;
    } else if (y > this.yDim) {
      y = 0;
    }

    return [x, y];
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    var that = this;
    this.movingObjects.forEach(function(movingObject) {
      if (movingObject.outOfBounds(that)) {
        if (movingObject instanceof Asteroids.Bullet) {
          that.remove(movingObject);
        } else {
          movingObject.pos = that.wrap(movingObject.pos);
          movingObject.draw(ctx);
        }
      }
      movingObject.draw(ctx);
    });
  };

  Game.prototype.addAsteroids = function(addNum) {
    for (var i = 0; i < addNum; i++) {
      var pos = this.randomPosition()
      var asteroid = new Asteroids.Asteroid({ pos: pos });
      this.movingObjects.push(asteroid);
    }
  }

  Game.prototype.replenishAsteroids = function() {
    var addNum = Game.NUM_ASTEROIDS - this.movingObjects.length;
    this.addAsteroids(addNum);
  }

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.xDim;
    var y = Math.random() * this.yDim;
    return [x, y];
  }

  Game.prototype.moveObjects = function() {
    this.movingObjects.forEach(function(movingObject) {
      movingObject.move();
    });
  };

  Game.prototype.start = function(canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers()
    var animateCallback = function() {
      this.moveObjects();
      this.checkCollisions();
      this.replenishAsteroids();
      this.draw(ctx);
      requestAnimationFrame(animateCallback);
    }.bind(this);
    animateCallback();
  }

  Game.prototype.bindKeyHandlers = function() {
    var ship = this.ship
    var that = this
    key('left', function() { ship.power([-1, 0])});
    key('right', function() { ship.power([1, 0])});
    key('up', function() { ship.power([0, -1])});
    key('down', function() { ship.power([0, 1])});
    key('a', function() { that.movingObjects.push(ship.fire()) });
  }

})();
