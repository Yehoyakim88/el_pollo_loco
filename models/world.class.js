class World {

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];

    clouds = [
        new Cloud('img/5_background/layers/4_clouds/1.png')
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0, canvas_height),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, canvas_height),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, canvas_height),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, canvas_height),
    ];
    canvas;
    ctx;
    keyboard;


    constructor(canvas, keyboard) {
        console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        console.log('this.keyboard: ', this.keyboard);
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
        this.addToMap(o);
        });
    }

    addToMap(movObject) {
        if(movObject.otherDirection) {
            this.flipImage(movObject);
        }
        this.ctx.drawImage(movObject.img, movObject.x, movObject.y, movObject.width, movObject.height);
        if(movObject.otherDirection) {
            this.flipImageBack(movObject);
        }
    }


    flipImage(movObject) {
        this.ctx.save();
        this.ctx.translate(movObject.width, 0);
        this.ctx.scale(-1, 1);
        movObject.x = movObject.x * -1;
    }


    flipImageBack(movObject) {
        this.ctx.restore();
        movObject.x = movObject.x * -1;
    }
}