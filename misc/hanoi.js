var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[3,2,1],[],[]];
}

HanoiGame.prototype = {
  isWon: function() {
    return (this.stacks[0].length === 0 &&
       (this.stacks[1].length === 3 || this.stacks[2].length === 3));
  },

  isValidMove: function(startTowerIdx, endTowerIdx) {
    var startTower = this.stacks[startTowerIdx];
    var endTower = this.stacks[endTowerIdx];
    if (isNaN(startTowerIdx) || isNaN(endTowerIdx)) {
      return false;
    } else if (startTowerIdx > 2 || startTowerIdx < 0 ||
          endTowerIdx > 2 || endTowerIdx < 0 ) {
      return false;
    } else if (startTower.length === 0) {
      return false;
    } else if (endTower.length === 0) {
      return true;
    } else {
      return startTower[startTower.length - 1] < endTower[endTower.length - 1];
    }
  },

  move: function(startTowerIdx, endTowerIdx) {
    var startTower = this.stacks[startTowerIdx];
    var endTower = this.stacks[endTowerIdx];

    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      endTower.push(startTower.pop());
      return true;
    } else {
      return false;
    }
  },

  print: function() {
    console.log(JSON.stringify(this.stacks));
  },

  promptMove: function(callback) {
    this.print();
    reader.question("Which stack should we move from?", function(firstAnswer){
      reader.question("Which stack should we move to?", function(secondAnswer){
        var from = parseInt(firstAnswer);
        var to = parseInt(secondAnswer);
        callback(from, to);
      });
    });
  },

  run: function(completionCallback) {
    if(this.isWon()) {
      console.log("You win!");
      completionCallback();
    } else {
      var that = this;
      this.promptMove(function(from, to) {
        that.move(from, to);
        that.run(completionCallback);
      });
    }
  }
};

var game = new HanoiGame();
game.run(function() {
  reader.close();
});
