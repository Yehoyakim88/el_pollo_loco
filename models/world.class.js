class World {

    character = new Character();
    // level = level1; // code-loesung von dveloper akademie
    level = initLevel();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('health');
    bottleBar = new StatusBar('bottle');
    numBottlesCollected = 0;
    numCoinsCollected = 0;
    coinBar = new StatusBar('coins');
    throwableObjects = [];
    DEBUG_COLLISION = false;

    intervalIds = [];


    constructor(canvas, keyboard) {
        // console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        console.log('this.keyboard: ', this.keyboard);
    }


    setWorld() {
        this.character.world = this;
    }


    setStoppableInterval(func, interValInMilliseconds) {
        let id = setInterval(func, interValInMilliseconds);
        this.intervalIds.push(id);
    }

    
    stopGame() {
        this.intervalIds.forEach(clearInterval);
    }


    run() {
        setInterval(() => {

            // checkCollisions with enemies
            // console.log('checking for collision...');
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkForCoins();
        }, 200);   
    }

    checkForCoins() {
        console.log('Checking for coins...');
        this.level.coins.forEach((coin, index) => {
            if(this.character.isCollecting(coin)) {
                console.log('Coin collected :)');
                this.removeCoinFromMap(index);
                this.numCoinsCollected++;
            }
        });
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy, index) && this.character.timePassed > 1.0) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
                return true; // testing !!!
            }
            // else {
            //     console.log('Wieder GUT :)');
            // }
        });
    }


    checkThrowObjects() {
        if(this.keyboard.SPACE) {
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
        this.ctx.font = "36px Ezra SIL";
        this.ctx.fillStyle = "white";
        let coinText = `x${this.numCoinsCollected}`;
        let bottleText = `x${this.numBottlesCollected}`;
        this.ctx.fillText(coinText, 100, 175);
        this.ctx.fillText(bottleText, 100, 115);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        // this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.coins);
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
        if(this.DEBUG_COLLISION) {movObject.drawFrame(this.ctx);}
        if(movObject.otherDirection) {this.flipImageBack(movObject);}
    }


    removeCoinFromMap(index) {
        this.level.coins.splice(index, 1);
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