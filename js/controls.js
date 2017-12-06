
var Controls = function() {

    this.pause = function() {
        var pause = document.createElement("button");
        pause.classList.add('mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent');
        pause.innerText = "Pause game";
        pause.id = "pause";
    }

    this.resume = function() {
        var resume = document.createElement("button");
        resume.innerText = "Resume game";
        resume.id = "resume";
    }

    this.restart = function() {
        var restart = document.createElement("button");
        restart.innerText = "Pause game";
        restart.id = "restart";
    }

}

module.exports = Controls;