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
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, this.canvas_height),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, this.canvas_height),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, this.canvas_height)
    ];
    canvas;
    canvas_height;
    ctx;
    // backgroundObjects;

    constructor(canvas, c_height) {
        console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas_height = c_height;

        console.log('c_height: ', c_height);
        console.log('this.canvas_height: ', this.canvas_height);
    }

    // backgroundObjects = [
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, this.canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, this.canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, this.canvas_height)
    // ];

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.backgroundObjects);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        
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
        this.ctx.drawImage(movObject.img, movObject.x, movObject.y, movObject.width, movObject.height);
    }
}