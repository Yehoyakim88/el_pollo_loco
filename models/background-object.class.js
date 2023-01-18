class BackgroundObject extends MovableObject {
    // x= 0; // will be overwritten by constructor anyway
    y;
    width = canvas.width;   // old value: width = 1280;
    height = canvas.height; // old cvalue:  // height = 640;


    constructor(imagePath, x, canvas_height) {
        // console.log('constructor of class BackgroundObject');
        // console.log('height of canvas: ', canvas_height);
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        console.log('Backgroundobject x: ', this.x);
        console.log('Backgroundobject y: ', this.y);
        console.log('Backgroundobject width: ', this.width);
        console.log('Backgroundobject height: ', this.height);

    }
}