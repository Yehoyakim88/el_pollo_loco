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
    energy = 100;

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
        }, 1000 / 25);
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
                ctx.strokeStyle = 'blue';
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

        console.log(`dy: ${dy}`);

        if((dx1 <= -25.0 && dx3 >= 26.0 && dy < 0) || (dx2 >= -12.0 && dx3 >= 26.0 && dy < 0)) {
            console.log(`Collision with chicken #${i} !!!!!!!!!!!!!!`);
            this.hurt_sound.play();        
        }
    }


    // isColliding (obj) {
    //     return   this.x+25 + this.width-65 > obj.x && 
    //              this.y+115 + this.height - 128 > obj.y &&
    //              this.x < obj.x && 
    //              this.y < obj.y + obj.height;
    //  }


//     isColliding (obj) {
//       return   this.x + this.width - this.offset.right > obj.x + obj.offset.left && 
//                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
//                this.x + this.offset.left < obj.x + obj.width -obj.offset.right && 
//                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
//    }
}