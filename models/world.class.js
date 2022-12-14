class World {

    character = new Character();

    backgroundObjects = generateBackground(this.backgroundObjects);
    level = level1;
    
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.checkCollisions();
        console.log('this.keyboard: ', this.keyboard);
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            // console.log('checking for collision...');
            this.level.enemies.forEach((enemy, index) => {
                this.character.isColliding(enemy, index);
                // let dx1 = enemy.x - (this.character.x + this.character.width);
                // let dx2 = this.character.x - (enemy.x + enemy.width);
                // let dx3 = enemy.x + enemy.width - this.character.x;
                // console.log('dx3: ', dx3);

                // if((dx1 <= -25.0 && dx3 >= 26.0) || (dx2 >= -12.0 && dx3 >= 26.0)) {
                //     console.log('Collision !!!!!!!!!!!!!!!!!!!!!!!!!');

                // }
                // else {
                //     console.log('ALL OKAY :)');
                // }


                // if(this.character.isColliding(enemy)){
                //     console.log('Collision with character ', enemy);
                //     this.character.energy -= 2;
                // }
            });
        }, 250);   
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
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
        if(movObject.otherDirection) {this.flipImage(movObject);}
        movObject.draw(this.ctx);
        if(movObject.otherDirection) {this.flipImageBack(movObject);}
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