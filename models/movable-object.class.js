class MovableObject extends DrawableObject {    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;     // Firats 3, my last was 2.5
    energy = 100;

    lastHit = 0;
    timePassed;
 
    // code snippet from Firat Yildirim
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    // -----------------------------------


    constructor() {
        super();
    }


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            else {
                this.y = 260;
            }
        }, 1000 / 25);   // original 1000 / 25
    }

    
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }
        else {
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
        if(this instanceof Character) {this.otherDirection = true;}
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    jumpAnimation(images) {
        setTimeout(() => {
            let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
            
        }, 1000);
    }


    isCollecting(obj) {
        let dx = obj.x - this.x;    //obj is coin and this points to character
        let dy = obj.y - this.y;
        if((dx >= -80 && dx <= 80 && dy >= 0 && dy <= 200))
        // if((dx >= -80 && dx <= 60 && dy >= 0 && dy <= 200)) // first values tried
        {
            if(obj instanceof Coin) {this.coin_sound.play();}
            else if(obj instanceof Bottle) {this.bottle_sound.play();}
            return true;
        }
    }


    // code snipped from Firat Yildirim
    isColliding (obj) {
        return  this.x + this.width - this.offset.right > obj.x + obj.offset.left && 
                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
                this.x + this.offset.left < obj.x + obj.width -obj.offset.right && 
                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
   }

   
   /**
     * This Function put the energy to 0, for kill the Chicken enemies.
     * 
     * @returns {number} The energystatus from the Movable Object.
     */
    chickenKilled() {
    return this.energy = 0;
}
   // ------------------------------------


    hit() {
        this.energy -= 10;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        this.timePassed = this.timePassed / 1000;
        return this.timePassed < 1.0;
    }
}