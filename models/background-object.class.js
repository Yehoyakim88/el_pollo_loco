class BackgroundObject extends MovableObject {
    x= 0;
    y;
    width = 1280;
    height = 640;

    constructor(imagePath, x, canvas_height) {
        // console.log('constructor of class BackgroundObject');
        // console.log('height of canvas: ', canvas_height);
        super().loadImage(imagePath);
        this.x = x;
        this.y = canvas_height - this.height;
    }
}