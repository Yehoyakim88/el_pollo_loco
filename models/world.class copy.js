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
    delta_x = [0, 0, canvas.width, 0, canvas.width, 0, canvas.width, -canvas_width];
    characterWalking = false;
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

        // this.addObjectsToMap(this.level.backgroundObjects); // comment in again for DA version

        // first approach of dynamic backgrounds
        // this.animateLayer3(); // first approach now without error reading properties of undefined
        // this.animateLayer2();
        // this.animateLayer1();

        // second approach of dynamic backgrounds
        this.animateLayer(2);   // comment out for DA version
        this.animateLayer(1);   // comment out for DA version
        this.animateLayer(0);   // comment out for DA version        
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
        // console.log('getBackgroundImage')
        let backgroundImagesA_B = [];
        let bgImageA = new Image();
        bgImageA.src = `img/background/${layer}-1.png`;
        // bgImageA.src = `img/background/1-1.png`;

        let bgImageB = new Image();
        bgImageB.src = `img/background/${layer}-2.png`;
        //  bgImageB.src = `img/background/1-2.png`;

        let bgImageC = new Image();
        bgImageC.src = `img/background/${layer}-2.png`;

        backgroundImagesA_B.push(bgImageA);
        backgroundImagesA_B.push(bgImageB);
        backgroundImagesA_B.push(bgImageC);

        // console.log('getBackgroundImage backgroundImagesA_B', backgroundImagesA_B);
        // console.log('getBackgroundImage backgroundImagesA_B[0]', backgroundImagesA_B[0]);
        // console.log('getBackgroundImage backgroundImagesA_B[1]', backgroundImagesA_B[1]);
        // console.log('getBackgroundImage backgroundImagesA_B[2]', backgroundImagesA_B[2]);

        return backgroundImagesA_B;
    }


    animateLayer1() {
        let bgImages;
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
        // requestAnimationFrame(this.animateLayer1);
    }


    animateLayer2() {
        let bgImages;
        bgImages = this.getBackgroundImage('2');

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

        this.ctx.drawImage(bgImages[0], this.x3, -50, this.canvas.width, 640);
        this.ctx.drawImage(bgImages[1], this.x4, -50, this.canvas.width, 640);
        // requestAnimationFrame(this.animateLayer2);
    }


    animateLayer3() {
        let bgImages;
        bgImages = this.getBackgroundImage('3');

        console.log('animateLayer 3 bgImages[0]', bgImages[0]);
        console.log('animateLayer 3 bgImages[1]', bgImages[1]);


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

        this.ctx.drawImage(bgImages[0], this.x5, -100, this.canvas.width, 640);
        this.ctx.drawImage(bgImages[1], this.x6, -100, this.canvas.width, 640);
        // requestAnimationFrame(this.animateLayer3);
    }


    animateLayer(layer) {
        let dynamic;
        let direction;
        let bgImages = [];
        let index = 2*(Number(layer)) + 1;
        bgImages = this.getBackgroundImage(layer+1);

        // console.log('animateLayer, this.characterWalking ', this.characterWalking);
        if(this.characterWalking) {
            // dynamic = 5 - 2 ** Number(layer-1);
            dynamic = 5;
        }
        else {
            dynamic = 0;
        }

        console.log('dynamic: ', dynamic);
        
        let yOffset = 0 - 50 * layer;

        // console.log('layer ', layer);
        // console.log('index ', index);
        // console.log('index+1 ', index+1);
        // console.log('dynamic ', dynamic);
        // console.log('yOffset ', yOffset);

        if(this.character.otherDirection) {
            direction = -1;
        }
        else {
            direction = 1;
        }
        
        // moving right
        if(this.delta_x[index] < -this.canvas.width+20) {
            this.delta_x[index] = this.canvas.width;
        }
        else {
            this.delta_x[index] -= dynamic*direction;
            
        }
        
        if(this.delta_x[index+1] < -this.canvas.width+20) {
            this.delta_x[index+1] = this.canvas.width;
        }
        else {
            this.delta_x[index+1] -= dynamic*direction; 
        }

        // for moving left
        if(this.delta_x[index] >= 2*this.canvas.width-20) {
            this.delta_x[index] = -this.canvas.width;
        }
        else {
            this.delta_x[index] -= dynamic*direction;
            
        }

        if(this.delta_x[index+1] >= 2*this.canvas.width-20) {
            this.delta_x[index+1] = -this.canvas.width;
        }
        else {
            this.delta_x[index+1] -= dynamic*direction; 
        }

        // // moving left
        // if(this.delta_x[index]+this.canvas.width == this.canvas.width-20) {
        //     this.delta_x[index-1] = -this.canvas.width+20;
        // }
        // else {
        //     this.delta_x[index] -= dynamic*direction;
        //     this.delta_x[index-1] -= dynamic*direction;
        // }

        // if(this.delta_x[index+1] >= this.canvas.width) {
        //     this.delta_x[index+1] = -this.canvas.width;
        //     this.delta_x[index-1] = -this.canvas.width+20;
        // }
        // else {
        //     this.delta_x[index+1] -= dynamic*direction;
        //     this.delta_x[index-1] -= dynamic*direction;
        // }


        // this.ctx.drawImage(bgImages[1], this.delta_x[index+6], yOffset, this.canvas.width, 640);
        // this.ctx.drawImage(bgImages[0], this.delta_x[index+6], yOffset, this.canvas.width, 640);
        // this.ctx.drawImage(bgImages[1], this.delta_x[index+8], yOffset, this.canvas.width, 640);


        // this.ctx.drawImage(bgImages[0], this.delta_x[index], yOffset, this.canvas.width, 640);
        // this.ctx.drawImage(bgImages[1], this.delta_x[index+1], yOffset, this.canvas.width, 640);
        
        this.ctx.drawImage(bgImages[0], this.delta_x[index], yOffset, this.canvas.width, 640);
        this.ctx.drawImage(bgImages[1], this.delta_x[index+1], yOffset, this.canvas.width, 640);
        this.ctx.drawImage(bgImages[2], this.delta_x[index]-this.canvas.width, yOffset, canvas_width, 640);
    }
}