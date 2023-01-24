class BackgroundObject extends MovableObject {
    DEBUG = false;
    // x= 0; // will be overwritten by constructor anyway
    y;
    width = canvas.width;   // old value: width = 1280;
    height = canvas.height; // old cvalue:  // height = 640;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}