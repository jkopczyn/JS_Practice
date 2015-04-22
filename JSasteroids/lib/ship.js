(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ast = window.Asteroids;

  var SHIP_SPEED = 0;
  var SHIP_RADIUS = 8;
  var SHIP_COLOR  ="#4F4";

  var Ship = Ast.Ship = function(box) {
    var newBox = {color: SHIP_COLOR, radius: SHIP_RADIUS,
                  vel: Ast.Util.randomVector(SHIP_SPEED) };
    newBox.pos = box.pos;
    newBox.game = box.game;
    Ast.MovingObject.call(this,newBox);
  };
  Ast.Util.inherits(Ship,Ast.MovingObject);

  Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var ship = this;
    var box = {pos: ship.pos, game: ship.game, vel: ship.vel};
    var bullet = new Ast.Bullet(box);
    this.game.add(bullet);
  };

  })();
