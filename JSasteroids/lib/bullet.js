(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ast = window.Asteroids;

  var BULLET_SPEED = 5;
  var BULLET_RADIUS = 3;
  var BULLET_COLOR  ="#000";

  var Bullet = Ast.Bullet = function(box) {
    var newBox = {color: BULLET_COLOR, radius: BULLET_RADIUS,
                  vel: null, pos: [box.pos[0], box.pos[1]], game: box.game };
    var direction = Ast.Util.direction(box.vel);
    newBox.vel = [direction[0] * BULLET_SPEED, direction[1] * BULLET_SPEED];
    Ast.MovingObject.call(this, newBox);
  };
  Ast.Util.inherits(Bullet, Ast.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    var game = this.game;
    if (otherObject instanceof Ast.Asteroid ) {
      game.remove(otherObject);
    } else {
      //nothing for now
    }
  };

  Bullet.prototype.isWrappable = false;

})();
