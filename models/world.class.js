class World {

    character = new Character();

    backgroundObjects = generateBackground(this.backgroundObjects);
    level = level1;
    
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [
        new ThrowableObject()
    ];


    constructor(canvas, keyboard) {
        console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        // this.checkCollisions();
        this.run();
        console.log('this.keyboard: ', this.keyboard);
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {

            // checkCollisions with enemies
            // console.log('checking for collision...');
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);   
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy, index) && this.character.timePassed > 1.0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            else {
                console.log('Wieder GUT :)');
            }
        });
    }


    checkThrowObjects() {
        if(this.keyboard.D) {
            console.log('Falsche werfen :)');
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw(this.character.x + 100, this.character.y + 100);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        // ---------- following lines for fixed objects ---------- //
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
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
        movObject.drawFrame(this.ctx);
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