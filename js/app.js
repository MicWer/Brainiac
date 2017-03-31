console.log("Hello");

//4. Konstruktor Furry'ego i monety
function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

//5. Przygotowanie obiektu gry
function Game() {

    this.board = document.querySelectorAll("#board div");
    this.width = 10;
    this.height = 10;

    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.scoreInn = document.querySelector("#score strong");

};

// 6. Obliczanie pozycji
Game.prototype.position = function(x,y) {
    return x + y * this.height;
}

//7. Rysowanie stanu planszy

Game.prototype.render = function() {
    for (var i = 0; i < this.board.length; i++) {
        this.board[i].classList.remove("furry");
    }
}

//furry
this.showFurry = function() {
    this.board.this.position(this.furry.x, this.furry.y).classList.add('furry');
}
    //pieniazek
this.showCoin = function() {
    this.board.this.position(this.coin.x, this.coin.y).classList.add('coin');
}

var gra = new Game();
gra.showFurry();
gra.showCoin();
