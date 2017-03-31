var Coin = require("./coin.js");
var Furry = require("./furry.js");


var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.scoreBoard = document.querySelector("#score div strong");
    this.finalScore = document.querySelector("#score div");
    this.furry = new Furry();
    this.gameEnd = false;
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    }

    this.moveFurry = function() {
        var self = this.furry;

        if (self.direction === "right") {
            self.x += 1;
        } else if (self.direction === "left") {
            self.x -= 1;
        } else if (self.direction === "down") {
            self.y += 1;
        } else if (self.direction === "up") {
            self.y -= 1;
        }
        this.gameOver();
        if (this.gameEnd == false) {
            this.hideFurry();
            this.checkCoinCollision();
            this.showFurry();
        }
    }

    this.hideFurry = function() {
        this.div = document.querySelector('.furry');
        this.div.classList.remove('furry');
    }

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    this.checkCoinCollision = function() {
        var self = this;
        this.coinEx = document.querySelector('.coin');
        if ((this.coin.x == this.furry.x) && (this.coin.y == this.furry.y)) {
            this.score += 1;
            this.scoreBoard.innerHTML = this.score;
            this.coinEx.classList.remove('coin');
            this.coinEx.classList.add('furry');
            this.coin = new Coin();
            this.showCoin();
            clearInterval(this.idSetInterval);

            self.interval -= 5;

            this.startGame();
        }
    }

    this.gameOver = function() {
        this.boardGame = document.getElementById("board");

        if ((this.furry.x > 9) || (this.furry.x < 0) || (this.furry.y > 9) || (this.furry.y < 0)) {
            console.log("game over");
            clearInterval(this.idSetInterval);
            this.gameEnd = true;
            this.boardGame.style.display = "none";
            this.finalScore.innerHTML = "<strong>GAME OVER</strong>, zdobyłeś " + this.score + " pkt.";
        }
    }
}

module.exports = Game;