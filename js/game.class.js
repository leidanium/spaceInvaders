var spaceHeight = 20;
var spaceWidth = 20;

var space = [];
var vessel;
var UI;
var enemy = [];
var fleetDirection = 1;
var shoot = [];
var invaderShoot = [];
var extrem = false;

var pause = false, endGame = false;

gameInit();


launchTimeout();

setTimeout(enemyUIInit, 500);

function gameInit() {
    spaceInit();
    enemyInit();
    vesselInit();

    UI = new UI();
    //enemyUIInit();
    //this.document.onkeydown = keyPressed;
}

function launchTimeout() {
    if (!endGame &&  !pause) {
        setTimeout(updateShipFromUI, 300);
        setTimeout(gameUpdate, 150);

        setTimeout(enemyFleetMove, 1500);
        setTimeout(fireAuto, 1000);
        setTimeout(bulletUpdate, 100);
        setTimeout(invaderFire, 1000);
        setTimeout(invadShootUIUpdate, 100);
        setTimeout(shootUIUpdate, 100);

        setTimeout(invaderBulletUpdate, 100);
    }
}

function spaceInit() {
    for (var i=0; i<spaceHeight; i++){
        space[i] = new Array(spaceWidth);
    }
}

function enemyInit() {
    for (var j=0; j < 5 ; j++) {
        for (var i=0; i < spaceWidth-5; i++){
            var tmpEnemy = new Invarders(j, i, i+Math.random());
            enemy.push(tmpEnemy);
            space[j][i] = "E";
        }
    }
}

function killInvader( posX, posY) {
    posX--;
    for (var i=0; i < enemy.length; i++){
        if (enemy[i].x === posX && enemy[i].y === posY){
            //console.log("death");
            destroyenemyUI(enemy[i].id);
            enemy.splice(i ,1);
            break;
        }
    }
}


function vesselInit() {
    vessel = new SpaceShip(spaceHeight-1, spaceWidth/2, 3, 0);
}

function fireAuto() {
    vessel.canFire();

    if (!endGame &&  !pause) {
        setTimeout(fireAuto, 1000);
    }
}


function fire() {
    vessel.fire();
}

function invaderFire() {
    for (var i= 0; i < enemy.length; i++){
        var luck = Math.floor(Math.random() * 10)
        if ( luck === 1){
            var tmpShoot = new Bullet( 2000+Math.random(), enemy[i].x + 1, enemy[i].y, -1);
            invaderFireUI(tmpShoot.id, enemy[i].id);
            invaderShoot.push(tmpShoot);
        }
    }
    if (!endGame &&  !pause) {
        setTimeout(invaderFire, 1000);
    }
}


function invaderBulletUpdate() {
    for (var i = 0; i < invaderShoot.length; i++) {
        if ((invaderShoot[i].x - invaderShoot[i].direction) >= spaceHeight) {
            destroyShootUI(invaderShoot[i].id);
            invaderShoot.splice(i, 1);
        }
        else if (space[invaderShoot[i].x - invaderShoot[i].direction][invaderShoot[i].y] === "V") {
           vessel.life -= 1;
           lifeUIDowngrade();
           destroyShootUI(invaderShoot[i].id);
           invaderShoot.splice(i, 1);
        }
        else {
            invaderShoot[i].x -= invaderShoot[i].direction;
        }
    }
    if (!endGame &&  !pause) {
        setTimeout(invaderBulletUpdate, 100);
    }
}

function bulletUpdate() {
    for (var i = 0; i < shoot.length; i++) {
        if ((shoot[i].x - shoot[i].direction) < 0) {
            destroyShootUI(shoot[i].id);
            //console.log("Bullet out of space");
            shoot.splice(i, 1);
        }
        else if (space[shoot[i].x - shoot[i].direction][shoot[i].y] === "E") {
            vessel.score += 100;
            destroyShootUI(shoot[i].id);
            killInvader(shoot[i].x, shoot[i].y);
            space[shoot[i].x - shoot[i].direction][shoot[i].y] = "";
            shoot.splice(i, 1);
        }
        else {
            shoot[i].x -= shoot[i].direction;
        }
    }
    if (!endGame &&  !pause) {
        setTimeout(bulletUpdate, 100);
    }
}

function gameUpdate() {
    //drawBullet();
    //drawEnemy();
    drawShip();
    endGame = endOfGame();

    if (!endGame &&  !pause) {
        setTimeout(gameUpdate, 300);
    }
    else {
        showEnd();
    }
}


function enemyFleetMove() {
    resetEnemyMap();
    if (extrem) {
        fleetMoveDown();
        if (fleetDirection === 1) {
            fleetDirection = -1;
        } else {
            fleetDirection = 1;
        }
        extrem = false;
    }
    else {
        for (var i = 0; i < enemy.length; i++) {
            enemy[i].y += fleetDirection;
            if (enemy[i].y === 0 || enemy[i].y === spaceWidth - 1) {
                extrem = true;
            }

        }
    }
    drawEnemy();
    if (!endGame &&  !pause) {
        setTimeout(enemyFleetMove, 1500);
    }
    enemyUIUpdate();
}

function fleetMoveDown() {
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].x += 1;
    }
}

function endOfGame() {
    if (vessel.life < 1)
        return true;

    if (enemy.length === 0)
        return true;

    for (var i = 0; i < enemy.length; i++) {
        if (enemy[i].x === spaceHeight - 1)
            return true;
    }
    return false;
}


//UI

function updateShipFromUI() {
    space[vessel.x][vessel.y] = "";
    var shipUI = document.getElementById("ship").offsetLeft;
    var emplacement = parseInt((shipUI + (shipWidth / 2)) / (backWidht / spaceWidth));
    vessel.y = emplacement;
    drawShip();
    //setTimeout(updateShipFromUI, 300);
    if (!endGame &&  !pause) {
        setTimeout(updateShipFromUI, 100);
    }
}

function enemyUIInit() {
    for (var i = 0; i < enemy.length; i++) {
        var invaderUIs = document.createElement("img");
        invaderUIs.id = enemy[i].id;
        invaderUIs.src = "http://localhost/spaceInvader/img/invader.png";

        invaderUIs.style.left = enemy[i].y * 30 + "px";
        invaderUIs.style.top = enemy[i].x * 20 + "px";
        document.getElementById("fleet").appendChild(invaderUIs);
    }
    //console.log("Call one time ");
    //setTimeout(enemyUIUpdate, 500);
    if (!endGame &&  !pause) {
        setTimeout(enemyUIUpdate, 300);
    }
}

function destroyenemyUI(id) {
    UI.destroyInvader(id);
}

function enemyUIUpdate() {
    UI.enemyUpdate();
}

function invadShootUIUpdate() {
    for (var i = 0; i < invaderShoot.length; i++) {

        var bulltTmp = document.getElementById(invaderShoot[i].id);

        if (bulltTmp.style.top !== invaderShoot[i].x * 20 + "px") {
            bulltTmp.style.top = invaderShoot[i].x * 20 + "px";
        }
    }
    if (!endGame &&  !pause) {
        setTimeout(invadShootUIUpdate, 100);
    }
    //setTimeout(invadShootUIUpdate, 300);
}

function shootUIUpdate() {
    for (var i = 0; i < shoot.length; i++) {

        var bulltTmp = document.getElementById(shoot[i].id);

        if (bulltTmp.style.top !== shoot[i].x * 20 + "px") {
            bulltTmp.style.top = shoot[i].x * 20 + "px";
        }
    }
    if (!endGame &&  !pause) {
        setTimeout(shootUIUpdate, 100);
    }
}

function destroyShootUI(id) {
    var shootTmp = document.getElementById(id);
    document.getElementById("bullet").removeChild(shootTmp);
}

function invaderFireUI(id, idInvader) {
    UI.invadersFire(id, idInvader);
}

function fireUI(id) {
    UI.fire(id);

}

function lifeUIDowngrade(){
    UI.lifeManagement();

}

//UI Console

/*function showShipPos() {
    console.log("x: " + vessel.x + " , y: " + vessel.y);
}

function showSpace() {
    //console.clear();
    space = [];
    spaceInit();
    drawBullet();
    drawEnemy();
    drawShip();

    var aff;
    for (var i = 0; i < spaceHeight; i++) {
        aff = "ligne " + i + " :";
        for (var j = 0; j < spaceWidth; j++) {
            if (space[i][j] === undefined) {
                aff += " ,";
            } else {
                aff += " " + space[i][j] + " ,";
            }
        }
        console.log(aff);
    }
}*/

function resetEnemyMap() {
    var cmpt = 0;
    //for (var i = 0; i < spaceHeight; i++) {
    for (var i = enemy[0].x; i < spaceHeight; i++) {
        for (var j = 0; j < spaceWidth; j++) {
            if (space[i][j] === "E") {
                space[i][j] = "";
                cmpt++;
                if (cmpt === enemy.length) {
                    break;
                }
            }
        }
        if (cmpt === enemy.length) {
            break;
        }
    }
}

function drawEnemy() {
    for (var i = 0; i < enemy.length; i++) {
        space[enemy[i].x][enemy[i].y] = "E";
    }
}

/*function drawBullet() {
    for (var i = 0; i < shoot.length; i++) {
        space[shoot[i].x][shoot[i].y] = "S";
    }
}*/

function drawShip() {
    space[vessel.x][vessel.y] = "V";
}

function showEnd() {
    console.log("You finish");
}
