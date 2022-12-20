class MovableObject extends DrawableObject {    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    lastHit = 0;
    timePassed;

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
        }, 1000 / 60);   // original 1000 / 25
    }

    
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 260;
        }   
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
        // console.log('playAnimation() ', images);
        // console.log(this.currentImage);
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if(this instanceof Coin) {
            console.log('i ', i);
            console.log('path ', path);
            console.log('this.img ', this.img);
        }
    }


    jump() {
        this.speedY = 40;
    }


    isColliding(obj, i) {
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


    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
        console.log('energy: ', this.energy);
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