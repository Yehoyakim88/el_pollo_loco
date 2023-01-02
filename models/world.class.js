class World {

    character = new Character();
    // level = level1; // code-loesung von developer akademie
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

    // some test code from YouTube
    x1 = 0;
    x2 = canvas_width;

    x3 = 0;
    x4 = canvas_width;

    x5 = 0;
    x6 = canvas_width
    // end of YouTube test code


    constructor(canvas, keyboard) {
        // console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        // this.keyboard = keyboard; // original position before edit
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

        //
        // this.addObjectsToMap(this.level.backgroundObjects);
        // this.drawBackground();   // alternative function from L. Michilena for dynamic background
        this.animateLayer3();
        this.animateLayer2();
        this.animateLayer1();
        
        
        //
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


    getBackgroundImage(layer) {
        let backgroundImagesA_B = [];
        let bgImageA = new Image();
        bgImageA.src = `img/background/${layer}-1.png`;

        let bgImageB = new Image();
        bgImageB.src = `img/background/${layer}-2.png`;

        backgroundImagesA_B.push(bgImageA);
        backgroundImagesA_B.push(bgImageB);

        return backgroundImagesA_B;
    }


    animateLayer1() {
        // let img1 = new Image();
        // img1.src = 'img/5_background/layers/1_first_layer/1.png';

        // let img2 = new Image();
        // img2.src = 'img/5_background/layers/1_first_layer/2.png';
        let bgImages = [];
        bgImages = this.getBackgroundImage('1');

        if(this.x1 < -this.canvas.width+10) {
            this.x1 = this.canvas.width;
        }
        else {
            this.x1 -= 5;
        }

        if(this.x2 < -this.canvas.width+10) {
            this.x2 = this.canvas.width;
        }
        else {
            this.x2 -= 5;
        }

        this.ctx.drawImage(bgImages[0], this.x1, 0, this.canvas.width, 640);
        this.ctx.drawImage(bgImages[1], this.x2, 0, this.canvas.width, 640);
        requestAnimationFrame(this.animateLayer1);
    }


    animateLayer2() {
        let img1 = new Image();
        img1.src = 'img/5_background/layers/2_second_layer/1.png';

        let img2 = new Image();
        img2.src = 'img/5_background/layers/2_second_layer/2.png';

        if(this.x3 < -this.canvas.width+10) {
            this.x3 = this.canvas.width;
        }
        else {
            this.x3 -= 2;
        }

        if(this.x4 < -this.canvas.width+10) {
            this.x4 = this.canvas.width;
        }
        else {
            this.x4 -= 2;
        }

        this.ctx.drawImage(img1, this.x3, -50, this.canvas.width, 640);
        this.ctx.drawImage(img2, this.x4, -50, this.canvas.width, 640);
        requestAnimationFrame(this.animateLayer2);
    }


    animateLayer3() {
        let img1 = new Image();
        img1.src = 'img/5_background/layers/3_third_layer/1.png';

        let img2 = new Image();
        img2.src = 'img/5_background/layers/3_third_layer/2.png';

        if(this.x5 < -this.canvas.width+10) {
            this.x5 = this.canvas.width;
        }
        else {
            this.x5 -= 1;
        }

        if(this.x6 < -this.canvas.width+10) {
            this.x6 = this.canvas.width;
        }
        else {
            this.x6 -= 1;
        }

        this.ctx.drawImage(img1, this.x5, -100, this.canvas.width, 640);
        this.ctx.drawImage(img2, this.x6, -100, this.canvas.width, 640);
        requestAnimationFrame(this.animateLayer3);
    }
}