/**
 * Created by Leid on 26/05/2017.
 */
function UI() {

    this.fire = function(id) {
        var shootUIs = document.createElement("img");
        shootUIs.id = id;
        shootUIs.src = "http://localhost/spaceInvader/img/kameha2.png";

        shootUIs.style.left = document.getElementById("ship").offsetLeft + 21 - 6 + "px";
        shootUIs.style.top = document.getElementById("ship").offsetTop + 50 + "px";
        document.getElementById("bullet").appendChild(shootUIs);
    }

    this.destroyInvader = function(id) {
        var invadTmp = document.getElementById(id);
        document.getElementById("fleet").removeChild(invadTmp);
    }

    this.enemyUpdate = function () {
        for (var i = 0; i < enemy.length; i++) {

            var invadTmp = document.getElementById(enemy[i].id);

            if (invadTmp.style.left !== (enemy[i].y * 30 + "px") || invadTmp.style.top !== enemy[i].x * 20 + "px") {
                invadTmp.style.left = enemy[i].y * 30 + "px";
                invadTmp.style.top = enemy[i].x * 20 + "px";
            }
        }
    }

    this.invadersFire = function (id, idInvader) {
        var shootUIs = document.createElement("img");
        shootUIs.id = id;
        shootUIs.src = "http://localhost/spaceInvader/img/canon.png";

        shootUIs.style.left = document.getElementById(idInvader).offsetLeft + 9 + "px";
        shootUIs.style.top = document.getElementById(idInvader).offsetTop + 20 + "px";
        document.getElementById("bullet").appendChild(shootUIs);
    }

    this.lifeManagement = function () {
        switch (vessel.life) {
            case 2:
                document.getElementById("life3").style.display = "none";
                document.getElementById("brokenLife3").style.display = "block";
                break;
            case 1:
                document.getElementById("life2").style.display = "none";
                document.getElementById("brokenLife2").style.display = "block";
                break;
            case 0:
                document.getElementById("life1").style.display = "none";
                document.getElementById("brokenLife1").style.display = "block";
                break;
            default:
                console.log('Life Downgrade Error');
                break;
        }
    }
}