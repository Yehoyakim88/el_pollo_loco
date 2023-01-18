class World {

    character = new Character();
    // level = level1; // code-loesung von developer akademie, obsolet
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
    DEBUG_COLLISION = true;

    intervalIds = [];
    

    //----------------------------------------------------------
    //----------------------------------------------------------
    // only available in game version 2.0-----------------------
    // delta_x = [0, 0, canvas.width, 0, canvas.width, 0, canvas.width, -canvas_width];
    // characterWalking = false;

    // backgroundImagesA_B = {
    //     0:[],
    //     1:[],
    //     2:[]
    // };
    //----------------------------------------------------------
    //----------------------------------------------------------
    //----------------------------------------------------------


    constructor(canvas, keyboard) {
        // console.log('constructor of class World');
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        // only available in game version 2.0
        // this.getBackgroundImage(2);
        // this.getBackgroundImage(1);
        // this.getBackgroundImage(0);
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
        this.draw();
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
            console.log('this.character.y: ', this.character.y);
            // checkCollisions with enemies
            // console.log('checking for collision...');
            // this.checkCollisions();  // obsolete
            this.checkCollisionsChicken();
            this.checkThrowObjects();
            this.checkForCoins();
        }, 1000/25);   // original 200
    }

    checkForCoins() {
        // console.log('Checking for coins...');
        this.level.coins.forEach((coin, index) => {
            if(this.character.isCollecting(coin)) {
                console.log('Coin collected :)');
                this.removeCoinFromMap(index);
                this.numCoinsCollected++;
            }
        });
    }


    checkCollisions() {
        // console.log(`this.character.isAboveGround(): ${this.character.isAboveGround()}`);
        // this.collidingEnemy();
        // this.collidingEnemyJump();
        // this.checkCollisionsChicken();

        // from Firat Yildirim

        // setInterval(() => {
        //     this.checkCollisionsChicken();
        //     // this.checkCollisionsEndboss();
        //     // this.checkCollectedCoins();
        //     // this.checkCollectedBottles();
        // }, 1000 / 25);
        // -----------------------
        
        
        
        // this.collidingBottle();
        // this.collidingCoin();
        
        // approach by F. Caspers

        // end of approach by F. Caspers


        // my own approach
        // this.level.enemies.forEach((enemy, index) => {
        //     // if(this instanceof Chicken)
        //     if(!this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof EndBoss) && this.character.isColliding(enemy, index) && this.character.timePassed > 1.0) {
        //         this.character.hit();
        //         this.healthBar.setPercentage(this.character.energy);
        //     }
        // });
    }


    // collidingEnemy() {
    //     this.level.enemies.forEach((enemy, index) => {
    //         if (this.character.isColliding(enemy, index) && !this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof EndBoss)) {
    //             this.character.hit();
    //             this.healthBar.setPercentage(this.character.energy)
    //         }
    //     });
    // }


    // collidingEnemyJump() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (!this.character.isHurt() && this.character.speedY <0 && this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
    //             console.log('ENEMY HIT!');
    //             enemy.hit();
    //             setTimeout(() => {
    //                 const index = this.level.enemies.indexOf(enemy);
    //                 console.log(index);
    //                 this.level.enemies.splice(index, 1);
    //             }, 200);
    //             this.character.jump();
    //             // if (!stopAudio) {
    //             //     this.jump_sound.play();
    //             // }
    //         }
    //     });
    // }


    // code snippet from Firat Yildirim
    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.HeIsColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.killChickenWithJumpFromTop(enemy, index);
                } else {
                    this.character.hit()
                    this.healthBar.setPercentage(this.character.energy);
                    this.character.hurt_sound.play();
                }
            }
        });
    }


    /**
     * This function is when we jumped on the chicken.
     * 
     * @param {string} enemy 
     */
    killChickenWithJumpFromTop(enemy, index) {
        let y_pos = this.character.y;
        console.log('Jumped on enemy on y: ', y_pos);
        enemy.chickenKilled();
        this.character.acceleration = 2.5;  // perfect acceleration
        this.character.jump(5);             // speedY match
        // audioDeadChicken.play();
        // audioDeadChicken.volume = 0.3
        setTimeout(() => {
            this.eraseEnemyFromArray(index);
            this.character.acceleration = 2.5     // reset acceleration after jumped on enemy
        }, 1000 / 60);
        
    }


    /**
     * This Function clear the current enemy from the Array.
     * 
     * @param {string} index 
     */
    eraseEnemyFromArray(index) {
        console.log('Enemy to delete is of index: ', index);
        this.level.enemies.splice(index, 1);
    }

    // -----------------------------------






    // // code snippet from F.C.

    // collidingEnemy() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.character.HeIsColliding(enemy) && !this.character.isAboveGround()) {
    //             this.character.hit();
    //             this.healthBar.setPercentage(this.character.energy)
    //         }
    //     });
    // }

    // collidingEnemyJump() {
    //     // console.log('this.character.isHurt(): ', this.character.isHurt());
    //     // console.log('this.character.speedY: ', this.character.speedY);
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.character.HeIsColliding(enemy) && this.character.speedY < 0 && this.character.isAboveGround() && (enemy instanceof Chicken)) {
    //             enemy.hit();
    //             setTimeout(() => {
    //                 const index = this.level.enemies.indexOf(enemy);
    //                 // console.log(index);
    //                 this.level.enemies.splice(index, 1);
    //             }, 200);
    //             console.log('Auf Hühnchen gehüpft xD');
    //             this.character.jumpedOnEnemy = true;
    //             this.character.jump();
    //             if (1) {
    //                 this.character.jump_sound.play();
    //             }
    //         }
    //     });
    // }


    // -----------------------------------------------------------------------


    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            console.log('Flasche werfen :)');
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw(this.character.x + 100, this.character.y + 100);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); // comment in again for DA version

        // only available in game version 2.0
        // this.animateLayer(2);   // comment out for DA version
        // this.animateLayer(1);   // comment out for DA version
        // this.animateLayer(0);   // comment out for DA version        
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
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
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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











    // the following functions are only for game version 2.0
    getBackgroundImage(layer) {
        // console.log('getBackgroundImage')
        let bgImageA = new Image();
        bgImageA.src = `img/background/${layer+1}-1.png`;

        let bgImageB = new Image();
        bgImageB.src = `img/background/${layer+1}-2.png`;

        let bgImageC = new Image();
        bgImageC.src = `img/background/${layer+1}-2.png`;

        this.backgroundImagesA_B[layer].push(bgImageA);
        this.backgroundImagesA_B[layer].push(bgImageB);
        this.backgroundImagesA_B[layer].push(bgImageC);

        // console.log('getBackgroundImage backgroundImagesA_B', backgroundImagesA_B);
        // console.log('getBackgroundImage backgroundImagesA_B[0]', backgroundImagesA_B[0]);
        // console.log('getBackgroundImage backgroundImagesA_B[1]', backgroundImagesA_B[1]);
        // console.log('getBackgroundImage backgroundImagesA_B[2]', backgroundImagesA_B[2]);
    }


    // function only for game version 2.0
    animateLayer(layer) {
        let movSpeed;
        let direction;
        let bgImages = [];
        let index = 2*(Number(layer)) + 1;

        // console.log('animateLayer, this.characterWalking ', this.characterWalking);
        if(this.characterWalking) {
            movSpeed = 9 - 4 * Number(layer);
            // movSpeed = 5;    // only for DEBUG PURPOSE
        }
        else {
            movSpeed = 0;
        }

        console.log('movSpeed: ', movSpeed);
        
        let yOffset = 0 - 50 * layer; // layer_1 -> 0, layer_2 -> -50, layer_3 -> 150
        

        // -50 entspricht + 590, also 

        // console.log('layer ', layer);
        // console.log('index ', index);
        // console.log('index+1 ', index+1);
        // console.log('dynamic ', dynamic);
        // console.log('yOffset ', yOffset);

        if(this.character.otherDirection) {
            direction = 1;
        }
        else {
            direction = -1;
        }
        
        if(direction == 1) {
            if(this.delta_x[index] > canvas_width - movSpeed) {
                this.delta_x[index] = -canvas_width + movSpeed;
            }
            else {
                this.delta_x[index] += movSpeed * direction;
            }

            if(this.delta_x[index+1] > canvas_width - movSpeed) {
                this.delta_x[index+1] = -canvas_width + movSpeed;
            }
            else {
                this.delta_x[index+1] += movSpeed * direction;
            }
        }

        if(direction == -1) {
            if(this.delta_x[index] >= -canvas_width + movSpeed) {
                this.delta_x[index] += movSpeed * direction;
            }
            else {
                this.delta_x[index] = canvas_width - movSpeed;
            }

            if(this.delta_x[index+1] >= -canvas_width + movSpeed) {
                this.delta_x[index+1] += movSpeed * direction;
            }
            else {
                this.delta_x[index+1] = canvas_width - movSpeed;
            }
        }

        this.ctx.drawImage(this.backgroundImagesA_B[layer][0], this.delta_x[index], yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][1], this.delta_x[index+1], yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][2], this.delta_x[index]-this.canvas.width, yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][0], this.delta_x[index]-2*this.canvas.width, yOffset, canvas_width, 640);
    }
}