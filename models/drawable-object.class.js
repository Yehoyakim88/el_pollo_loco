class DrawableObject {
    // the following class members are originally from movable-object.class.js
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 300;
    height = 360;
    width = 200;
    // ---------------------------------------------------------------------
    statusBarX = 50;

    
    // outsourced from movable-object.class.js
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    // outsourced from movable-object.class.js
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    drawFrame(ctx) {
        if(this.width < canvas_width) {
            if(this instanceof Character || this instanceof Chicken || this instanceof EndBoss || this instanceof Coin || this instanceof ThrowableObject) {
                ctx.beginPath();
                ctx.linewidth = '10px';
                ctx.strokeStyle = 'red';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
    }


    // outsourced from movable-object.class.js
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}