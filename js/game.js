var Weed = require("./weed.js");
var Brainiac = require("./brainiac.js");

var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.scoreBoard = document.querySelector("#score div strong");
    this.finalScore = document.querySelector("#score div");
    this.weed = new Weed();
    this.brainiac = new Brainiac();
    this.gameEnd = false;
    this.score = 0;
    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showBrainiac = function() {
        this.board[this.index(this.brainiac.x, this.brainiac.y)].classList.add('brainiac');
    }

    this.showWeed = function() {
        this.board[this.index(this.weed.x, this.weed.y)].classList.add('weed');
    }

    this.startGame = function() {
        var self = this;

        this.idSetInterval = setInterval(function() {
            self.moveBrainiac();
        }, 150);
    }

    this.moveBrainiac = function() {
        var self = this.brainiac;

        switch(self.direction) {
            case 'right':
                self.x += 1;
                break;
            case 'left':
                self.x -= 1;
                break;
            case 'up':
                self.y -= 1;
                break;
            case 'down':
                self.y += 1;
                break;
        }

        this.gameOver();

        if (!this.gameEnd) {
            this.hideBrainiac();
            this.checkCoinCollision();
            this.showBrainiac();
        }
    }

    this.hideBrainiac = function() {
        this.div = document.querySelector('.brainiac');
        this.div.classList.remove('brainiac');
    }

    this.turnBrainiac = function(event) {
        switch (event.which) {
            case 37:
                this.brainiac.direction = 'left';
                break;
            case 38:
                this.brainiac.direction = 'up';
                break;
            case 39:
                this.brainiac.direction = 'right';
                break;
            case 40:
                this.brainiac.direction = 'down';
                break;
        }
    }

    this.checkCoinCollision = function() {
        var self = this;
        this.coinEx = document.querySelector('.weed');
        if ((this.weed.x === this.brainiac.x) && (this.weed.y === this.brainiac.y)) {
            this.score += 1;
            this.scoreBoard.innerHTML = this.score;
            this.coinEx.classList.remove('weed');
            this.coinEx.classList.add('brainiac');
            this.weed = new Weed();
            this.showWeed();
            clearInterval(self.idSetInterval);

            this.startGame();
        }
    }

    this.gameOver = function() {

        var restart = document.createElement("button");
        restart.innerText = "Try again";
        restart.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
        restart.style.backgroundColor = "saddlebrown";
        restart.style.color = "sandybrown";
        restart.id = "restart";

        this.scoreSection = document.getElementById("score");
        this.boardGame = document.getElementById("board");

        if ((this.brainiac.x > 9) || (this.brainiac.x < 0) || (this.brainiac.y > 9) || (this.brainiac.y < 0)) {
            console.log("game over");
            clearInterval(this.idSetInterval);
            this.gameEnd = true;
            this.boardGame.style.display = "none";
            this.finalScore.innerHTML =  "<strong>GAME OVER</strong>, You scored " + this.score + " points.";
            this.scoreSection.appendChild(restart);
            document.getElementById("restart").addEventListener("click", function() {
                window.location.reload();
            })
        }
    }

}

module.exports = Game;