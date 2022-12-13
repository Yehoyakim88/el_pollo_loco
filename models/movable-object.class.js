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


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');

    }


    moveLeft() {
        setInterval(() =>{
            this.x -= this.speed;
            if(this.x < 0 - this.width) {
                this.x = 1280;
            }
        }, 1000 / 60);
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}