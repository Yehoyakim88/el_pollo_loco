class MovableObject extends DrawableObject {    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    lastHit = 0;
    timePassed;

    dies_sound = new Audio('./audio/whuuaaaaaaaaa_1.mp3');
    died_sound = new Audio('./audio/lose1.mp3');

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    };


    constructor() {
        super();
    }


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 25);   // original 1000 / 25
    }

    
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }
        else {
            // console.log('this.y: ', this.y);
            return this.y < 260;
        }   
    }


    setCharacterIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    setCharacterLongIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    playAnimation(images) {
        // console.log('playAnimation, images: ', images);
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        // console.log('path', path);
        // console.log('this.img', this.img);
    }


    jumpAnimation(images) {
        setTimeout(() => {
            let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
            
        }, 1000);
    }


    jump() {
        this.speedY = 40;
    }


    isCollecting(obj) {
        let dx = obj.x - this.x;    //obj is coin and this points to character
        let dy = obj.y - this.y;
        // console.log('dy = ', dy);
        // console.log('movObject.isCollecting()');
        // console.log('dx = ', dx);
        if((dx >= -80 && dx <= 80 && dy >= 0 && dy <= 200))
        // if((dx >= -80 && dx <= 60 && dy >= 0 && dy <= 200)) // first values tried
        {
            // console.log('Coin geeeeeeeeeeesammelt');
            this.coin_sound.play();
            return true;
        }
    }


    isColliding(obj, i) {
        if(!this.alreadyDead) {
            let dx1 = obj.x - (this.x + this.width);
            let dx2 = this.x - (obj.x + obj.width);
            let dx3 = obj.x + obj.width - this.x;
            let dy = obj.y - (this.y+this.height);

            if((dx1 <= -25.0 && dx3 >= 26.0 && dy < 0) || (dx2 >= -12.0 && dx3 >= 26.0 && dy < 0)) {
                // console.log(`Collision with chicken #${i} !!!!!!!!!!!!!!`);
                this.hurt_sound.play();
                return true        
            }
            else {
                return false;
            }
        }
    }


    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
        // console.log('energy: ', this.energy);
    }



    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        this.timePassed = this.timePassed / 1000;
        return this.timePassed < 1.5;
    }
}