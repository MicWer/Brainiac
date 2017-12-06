/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Weed = __webpack_require__(3);
var Brainiac = __webpack_require__(2);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(0);

var game = new Game();
game.showBrainiac();
game.showWeed();
game.startGame();


document.addEventListener('keydown', function(event) {
    game.turnBrainiac(event);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Brainiac = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Brainiac;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Weed = function() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Weed;

/***/ })
/******/ ]);