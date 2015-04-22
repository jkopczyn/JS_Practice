var TTT = require("./ttt");
var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// var game = new TTT.Game(reader, TTT.HumanPlayer, TTT.HumanPlayer);
// game.run(function(){
//   reader.close();
// });

// var game = new TTT.Game(reader, TTT.AIPlayer, TTT.AIPlayer);
// game.run(function(){
//   reader.close();
// });

// var game = new TTT.Game(reader, TTT.HumanPlayer, TTT.AIPlayer);
// game.run(function(){
//   reader.close();
// });

var game = new TTT.Game(reader, TTT.AIPlayer, TTT.HumanPlayer);
game.run(function(){
  reader.close();
});
