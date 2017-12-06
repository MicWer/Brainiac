var Game = require("./game.js");

var game = new Game();
game.showBrainiac();
game.showWeed();
game.startGame();


document.addEventListener('keydown', function(event) {
    game.turnBrainiac(event);
});