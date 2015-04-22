(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ast = window.Asteroids;

  var ASTEROID_SPEED = 3;
  var ASTEROID_RADIUS = 12;
  var ASTEROID_GRAY  ="#777";

  var Asteroid = Ast.Asteroid = function(box) {
    var newBox = {color: ASTEROID_GRAY, radius: ASTEROID_RADIUS,
      vel: Ast.Util.randomVector(ASTEROID_SPEED) };
    newBox.pos = box.pos;
    newBox.game = box.game;
    Ast.MovingObject.call(this,newBox);
  };
  Ast.Util.inherits(Asteroid,Ast.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    var game = this.game;
    if (otherObject instanceof Ast.Ship ) {
      otherObject.relocate();
    } else {
      //nothing for now
    }
  };

  })();
