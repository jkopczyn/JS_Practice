(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ast = window.Asteroids;

  var DIM_X = 800;
  var DIM_Y = 800;
  var NUM_ASTEROIDS = 50;

  var Game = Ast.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ast.Ship({ pos: this.randomPosition(), game: this });
    this.addAsteroids();
    //"breakpoint";
  };

  Game.prototype = {
    addAsteroids: function() {
      for (var i = 0; i < NUM_ASTEROIDS; i++) {
        //"breakpoint";
        var newAst = new Ast.Asteroid({ pos: this.randomPosition(), game: this });
        this.asteroids.push(newAst);
      }
    },

    randomPosition: function() {
      var x = Math.random() * DIM_X;
      var y = Math.random() * DIM_Y;
      return [x, y];
    },

    draw: function(ctx) {
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      this.objects().forEach(function(object) {
        object.draw(ctx);
      });

    },

    objects: function() {
      return this.asteroids.concat(this.bullets).concat([this.ship]);
    },

    moveObjects: function() {
      this.objects().forEach(function(obj) {
        obj.move();
      });
    },

    wrap: function(pos) {
      return [Ast.Util.posMod(pos[0], DIM_X), Ast.Util.posMod(pos[1], DIM_Y)];
    },

    checkCollisions: function() {
      var allThings = this.objects();
      allThings.forEach(function(obj){
        allThings.forEach(function(otherObj){
          if (obj.isCollidedWith(otherObj)) {
            obj.collideWith(otherObj);
          }
        });
      });
    },

    step: function() {
      this.moveObjects();
      this.checkCollisions();
    },

    remove: function(object) {
      return Ast.Util.remove(this.asteroids, object) || Ast.Util.remove(this.bullets, object);
    },

    add: function(object) {
      if (object instanceof Ast.Asteroid) {
        this.asteroids.push(object);
      } else if (object instanceof Ast.Bullet) {
        this.bullets.push(object);
      }
    },

    outOfBound: function(pos) {
      return pos[0] < 0 || pos[0] > DIM_X || pos[1] < 0 || pos[1] > DIM_Y;
    }
  };


})();
