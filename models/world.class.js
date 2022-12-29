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

    // the following are from L. Michilena's game.js
    graphics = {};
    bgImgSettings = {};
    bgCounter = 0;
    endScreenOn = false;
    // end

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

        // from 
        this.addBgLayerGraphics();
        //
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


    // the following function are from L. Michilean's El Pollo Loco for dynamic
    // background layers
    addBgLayerGraphics() {
        this.addGraphicsList("background", "bg1", 3);
        this.addGraphicsList("background", "bg2", 3);
        this.addGraphicsList("background", "bg3", 3);
    }


    /**
    * Adds graphics/animations to the game, IMPORTANT: the name of the files have to be: name-1.png,name-2.png,name-3.png, etc.
    * @param {String} grName Name of the graphic/animation, I.E.: If the file name is jump-1.png the name of the graphic is "jump".
    * @param {Number} NumberOfImages Number of total images with the same name for the animation
    */
    addGraphicsList(folder, grName, numberOfImages) {
        if (this.graphics[grName] == undefined) this.graphics[grName] = { list: [], cachedImages: [], index: 0, counter: 0 };
        for (let i = 0; i < numberOfImages; i++) {
            this.graphics[grName].list.push(`img/${folder}/${grName}-${i + 1}.png`);
        }
    }


    /**
 * Adds ground and background images, from most far away to closest background
 */
    drawBackground() {
        this.ctx.fillStyle = "#ffe699";
        this.ctx.fillRect(0, canvas.height - (canvas.height / 3), canvas.width, canvas.height);
        // this.addBackgroundImage("bg3", 150, 1);
        // this.addBackgroundImage("bg2", 140, 5);
        // this.addBackgroundImage("bg1", canvas.height / 4, 9); // canvas.height = 480
        this.addBackgroundImage("3", 150, 1);
        this.addBackgroundImage("2", 140, 5);
        this.addBackgroundImage("1", canvas_height-560, 9); // canvas.height = 480

        this.bgCounter = 0;
}

    /**
    * Adds background images given in pairs, and makes an infinite background
    * @param {*} name Name of the background image, I.E.: file name is bg1-1.png, name will be 'bg1' 
    * @param {*} y Coordinate for the background to be positioned
    * @param {*} offsetSpeed Backgrounds further away should have a slower offset speed
    */
    addBackgroundImage(name, y, offsetSpeed) {
        if (this.bgImgSettings[this.bgCounter] == undefined) 
            this.bgImgSettings[this.bgCounter] = { x: [-canvas.width, 0], y: y, offsetSpeed: offsetSpeed };
        let img = [];
        for (let i = 0; i < 2; i++) {
            // img[i] = this.graphics[name].cachedImages[i];
            img[i] = new Image();
            // img[i].src = 'img/background/bg1-1.png';
            img[i].src = 'img/background/' + `${name}` + `-${i+1}.png`;
            // img[i] = this.level.backgroundObjects[1];
            console.log('img[i]: ', img[i]);
            console.log('img[i].src: ', img[i].src);
            //background reapears on the other side when offscreen, making the background infinite
            if (this.bgImgSettings[this.bgCounter].x[i] < -canvas.width) this.bgImgSettings[this.bgCounter].x[i] = this.bgImgSettings[this.bgCounter].x[i] + (canvas.width * 2);
            if (this.bgImgSettings[this.bgCounter].x[i] > canvas.width) this.bgImgSettings[this.bgCounter].x[i] = this.bgImgSettings[this.bgCounter].x[i] - (canvas.width * 2);
            //Background moves when character is moving, offset will be slower for further away backgrounds
            // if (isMovingLeft && !characterIsHurt && !this.endScreenOn) {
            if (this.keyboard.LEFT && !this.character.isHurt() && !this.endScreenOn) {
                this.bgImgSettings[this.bgCounter].x[i] = this.bgImgSettings[this.bgCounter].x[i] + offsetSpeed;
            }
            else if (this.keyboard.RIGHT && !this.character.isHurt() && !this.endScreenOn) {
                this.bgImgSettings[this.bgCounter].x[i] = this.bgImgSettings[this.bgCounter].x[i] - offsetSpeed;
            }
            this.ctx.drawImage(img[i], this.bgImgSettings[this.bgCounter].x[i], (1 / (img[i].height / canvas.height)) * 10 - y, img[i].width * (1 / (img[i].width / canvas.width)), img[i].height * (1 / (img[i].width / canvas.width)));
        }

        this.bgCounter++;
    }

    animateLayer1() {
        let img1 = new Image();
        img1.src = 'img/5_background/layers/1_first_layer/1.png';

        let img2 = new Image();
        img2.src = 'img/5_background/layers/1_first_layer/2.png';


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

        this.ctx.drawImage(img1, this.x1, 0, this.canvas.width, 640);
        this.ctx.drawImage(img2, this.x2, 0, this.canvas.width, 640);
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
        requestAnimationFrame(this.animateLayer1);
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
        requestAnimationFrame(this.animateLayer1);
    }
}