console.log("Hello");


function Game() {

    this.board = document.querySelectorAll("#board div");
    this.width = 10;
    this.height = 10;

    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.scoreInn = document.querySelector("#score strong");

};


function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}


