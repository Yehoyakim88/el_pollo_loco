class BackgroundObject extends MovableObject {
    // x= 0; // will be overwritten by constructor anyway
    y;
    // width = 1280;
    width = canvas.width;
    // height = 640;
    height = canvas.height;


    constructor(imagePath, x, canvas_height) {
        // console.log('constructor of class BackgroundObject');
        // console.log('height of canvas: ', canvas_height);
        super().loadImage(imagePath);
        this.x = x;
        // this.y = canvas_height - this.height;
        this.y = 0;
        console.log('Backgroundobject x: ', this.x);
        console.log('Backgroundobject y: ', this.y);
        console.log('Backgroundobject width: ', this.width);
        console.log('Backgroundobject height: ', this.height);

    }
}