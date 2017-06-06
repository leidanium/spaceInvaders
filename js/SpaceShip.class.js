function SpaceShip(x, y, life, score) {
    this.x = x;
    this.y = y;
    this.life = life;
    this.score = score;
    this.fireAuth = true;

    //this.fire = function (bulletCollection) {}

    this.cantFire = function () {
        this.fireAuth = false;
    }

    this.canFire = function () {
        this.fireAuth = true;
    }

    this.fire = function () {
        if (this.fireAuth){
            var tmpShoot = new Bullet( 1000+Math.random(), vessel.x - 1, vessel.y, 1);
            shoot.push(tmpShoot);
            fireUI(tmpShoot.id);
            this.cantFire();
        }
    }
}