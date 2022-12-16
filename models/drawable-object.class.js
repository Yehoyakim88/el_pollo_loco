class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 300;
    height = 360;
    width = 200;
    statusBarX = 50;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}