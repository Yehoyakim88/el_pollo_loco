class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 360;
    width = 200;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');

    }

    moveLeft() {
        console.log('Moving left');
    }
}