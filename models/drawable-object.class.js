class DrawableObject {
    // the following class members are originally from ovable-object.class.js
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 300;
    height = 360;
    width = 200;
    // ---------------------------------------------------------------------
    statusBarX = 50;


    // outsourced from ovable-object.class.js
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    // outsourced from ovable-object.class.js
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    drawFrame(ctx) {
        if(this.width < canvas_width) {
            if(this instanceof Character || this instanceof Chicken || this instanceof EndBoss || this instanceof Coin) {
                ctx.beginPath();
                ctx.linewidth = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
    }


    // outsourced from ovable-object.class.js
    draw(ctx) {
        if(this instanceof BackgroundObject) {
            console.log('this.img :', this.img);
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}