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
        }, 1000 / 25);   // original 1000 / 25
    }

    
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        }
        else {
            // console.log('this.y: ', this.y);
            return this.y < 260;    // with Firats Code 360
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
            if(obj instanceof Coin) {this.coin_sound.play();}
            else if(obj instanceof Bottle) {this.bottle_sound.play();}
            return true;
        }
    }


    isColliding(obj, i) {
        if(!this.alreadyDead && obj instanceof Chicken) {
            let dx1 = obj.x - (this.x + this.width);
            let dx2 = this.x - (obj.x + obj.width);
            // let dx3 = obj.x + obj.width - this.x;
            let dy = obj.y - (this.y+this.height);
            // let dy = obj.y - this.y;
            // console.log(`Character\'s bottom: ${this.y + this.height}`);
            // console.log(`Chicken\'s bottom: ${obj.y + obj.height}`);
            // console.log(`Character height: ${this.height} y: ${this.y} x: ${this.x}`);
            // console.log(`Enemy y: ${obj.y}\nx: ${obj.x} `);
            // console.log(`Abstand in y zwischen Character und Chicken: ${obj.y - this.y}`);
            // console.log(`dy: ${dy}`);
            if((dy <=20 && dx1 <= -20) && (dy <=20 && dx2 <= -40)){
                // this.hurt_sound.play();  
                return true;      
            }
            else {
                return false;
            }
                // return true;
        }
            // else {
            //     return false;
            // }
    }


    // code snipped from Firat Yildirim
    HeIsColliding (obj) {
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
        this.energy -= 5;
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
        return this.timePassed < 1.5;   // Firat Yildirim's value would be 1
    }
}