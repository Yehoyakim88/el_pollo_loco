class MovableObject {
    x = 120;
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
}