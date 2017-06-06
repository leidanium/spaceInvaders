
var left_key = 37,
    right_key = 39,
    shoot_key = 32;

//var spaceship = document.getElementById("ship")

// Keyboard listenner
this.document.onkeydown = keyPressed;
this.document.onkeyup = keyUnpressed;

document.getElementById("play").onclick = playClick;
document.getElementById("pause").onclick = pauseClick;

var left = false, right = false, spaceK = false;

var distLeft = 0;
var shipSpeed = 3;
var backWidht = 600, backHeight = 400;

var shipWidth = 42;

//var stop = false;

setTimeout(inputUpadate, 33);

//var audio = new Audio('http://localhost/spaceInvader/music/spaceinvaders1.mpeg');
//myAudio.addEventListener('ended', function() {
//    this.currentTime = 0;
//    this.play();
//}, false);
//audio.play();

function playClick() {
    pause = false;
    launchTimeout();
    setTimeout(enemyUIUpdate, 300);

    console.log("playclick");

    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";

}

function pauseClick() {
    pause = true;

    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
}

function keyUnpressed() {
    if (event.keyCode == left_key) {
        left = false;
    }
    if (event.keyCode == right_key) {
        right = false;
    }
    if (event.keyCode == shoot_key) {
        spaceK = false;
    }
}

function keyPressed() {
    if (event.keyCode == left_key) {

            left = true;
            right = false;

    }
    if (event.keyCode == right_key) {
        right = true;
        left = false;
    }
    if (event.keyCode == shoot_key) {
        spaceK = true;
    }
}

function inputUpadate() {
    if (left && document.getElementById("ship").offsetLeft > 0 ){
        distLeft = document.getElementById("ship").offsetLeft;
        distLeft -= shipSpeed;
        document.getElementById("ship").style.left = "" + distLeft + "px";
    } else if(right && document.getElementById("ship").offsetLeft < (backWidht - shipWidth)){
        distLeft = document.getElementById("ship").offsetLeft;
        distLeft += shipSpeed;
        document.getElementById("ship").style.left = "" + distLeft + "px";
    }

    if (spaceK){
        fire();
    }
    setTimeout(inputUpadate, 33);
}

