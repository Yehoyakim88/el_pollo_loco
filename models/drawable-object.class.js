class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 300;
    height = 360;
    width = 200;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawFrame(ctx);
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}