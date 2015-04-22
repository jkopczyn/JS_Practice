(function() {
  if(typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ast = window.Asteroids;

  var GameView = Ast.GameView = function(ctx) {
    this.game = new Ast.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    var view = this;
    this.bindKeyHandlers();
    setInterval(function() {
      view.game.step();
      view.game.draw(view.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    key('up', function() {
      ship.power([0, -1]);
    });
    key('down', function() {
      ship.power([0, 1]);
    });
    key('left', function() {
      ship.power([-1, 0]);
    });
    key('right', function() {
      ship.power([1, 0]);
    });
    key('space', function() {
      ship.fireBullet();
    });
  };


})();
