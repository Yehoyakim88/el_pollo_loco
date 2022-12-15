class MovableObject {
    x = 100;
    y = 300;
    img;
    height = 360;
    width = 200;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    // acceleration = 2.25;
    energy = 100;

    lastHit = 0;

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    };


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 60);   // original 1000 / 25
    }

    
    isAboveGround() {
        return this.y < 260;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawFrame(ctx);
    }


    drawFrame(ctx) {
        if(this.width < canvas_width) {
            if(this instanceof Character || this instanceof Chicken || this instanceof EndBoss) {
                ctx.beginPath();
                ctx.linewidth = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
        console.log('playAnimation() ', images);
        console.log(this.currentImage);
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
        this.energy -= 5;
        if(this.enery < 0) {
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
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1.5;
    }
}