class World {
    character = new Character();
    level = initLevel();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new Coinbar();
    endBossBar = new EndBossBar();

    numBottlesCollected = 3;
    bottle;
    bottleThrowing = false;
    numCoinsCollected = 0;
    
    throwableObjects = [];
    no_bottle_sound = new Audio('audio/no_bottle.mp3');
    throw_sound = new Audio('audio/throw_shout.mp3');
    has_splashed = false;
    DEBUG_COLLISION = false;
    DO_NOT_CANCEL_THIS;

    intervalIds = [];
    approached = false;
    boss_approaching_sound = new Audio('audio/boss_approaching.mp3');
    bossanova = new Audio('audio/latin-100882.mp3');    // source: https://pixabay.com/music/search/salsa/

    you_lost_sound = new Audio('audio/miss_8Yfu3Y9.mp3');
    gameOver = false;
    you_lost = false;
    you_won_sound = new Audio('audio/won.mp3');

    chickenKilled = false;

    music = false;
    backgroundMusic;
    
    backgroundMusicPlaying = false;
    gameScreen = document.getElementById('game-window');
    startScreen = document.getElementById('startscreen-container');
    helpScreen = document.getElementById('helpscreen-container');
    youWinScreen = document.getElementById('endscreen-container');
    youLostScreen = document.getElementById('youLost-container');
    canvasScreen = document.getElementById('game-canvas');
    touchControls = document.getElementById('touch-controls');
    musicToggleButton = document.getElementById('music-on-off');

    help_displayed = false;
    gamePaused = false;
    idd;
    

    constructor(canvas, keyboard, backgroundMusic) {        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.backgroundMusic = backgroundMusic;
        this.draw();
        this.setWorld();
        this.run();
    }


    toggleMusic(){
        if(!this.music) {
            document.getElementById('music-on-off').src= './img/musicon.png';
            this.playLevelMusic();
        }
        else if(this.music){
            document.getElementById('music-on-off').src= './img/musicoff.png';
            this.pauseLevelMusic();
        }
    }


    playLevelMusic() {
        this.backgroundMusic.play();
        this.music = true;
    }


    pauseLevelMusic(reset=true) {
        this.backgroundMusic.pause();
        if(reset) {this.backgroundMusic.currentTime = 0.0;}
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
        if(!this.gameOver) {
            this,this.checkForCollisions();
            this.checkForHelp();
        }
    }


    checkForCollisions() {
        setInterval(() => {
            // checkCollisions with other objects
            this.checkCollisionsChicken();
            this.checkThrowObjects();
            this.CollidingBottleWithEnemy();
            this.checkForCoins();
            this.checkForBottles();
            this.checkApproachingBoss();
        }, 1000/25);
    }


    checkForHelp() {
        setInterval(() => {
            if(this.keyboard.HELP && !this.you_lost && !this.gameOver) {
                // console.log('CLEAR ALL INTERVALS except for ID: ', this.DO_NOT_CANCEL_THIS);
                this.gameScreen.classList.add('d-none');
                this.helpScreen.classList.remove('d-none');
                // clearAllIntervals();
                this.help_displayed = true;
            }
            else if(!this.keyboard.HELP) {
                // console.log('RESET ALL INTERVALS!');
                this.gameScreen.classList.remove('d-none');
                this.helpScreen.classList.add('d-none');
                // resetAllIntervals();
                this.help_displayed = false;
            }
        }, 1000/25);   // original 200
    }
    

    checkApproachingBoss() {
        this.checkCharacterPosition();
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof EndBoss) {
                if(enemy.x - this.character.x <= 1100){
                    if(!this.boss_seen) {this.gettingSerious();}
                }
                else {this.heIsApproaching();}
            }
        });
    }


    checkCharacterPosition() {
        if(this.character.x >= 2700) {
            if(!this.approached) {
                this.boss_approaching_sound.play();
                this.backgroundMusic.volume = 0.2;
                this.approached = true;
            }
        }
        else {
            this.approached = false;
            this.boss_approaching_sound.pause();
            this.boss_approaching_sound.currentTime = 0.0;
            this.backgroundMusic.volume = 0.75;
        }
    }


    gettingSerious() {
        this.boss_approaching_sound.pause();
        this.boss_approaching_sound.currentTime = 0.0;
        this.bossanova.volume = 0.75;
        this.bossanova.play();
        if(this.music) {
            this.pauseLevelMusic(false);
        }
        this.boss_seen = true;
    }


    heIsApproaching() {
        this.bossanova.pause();
        this.bossanova.currentTime = 0.0;
        if(this.boss_seen && this.music) {
            this.backgroundMusic.volume = 0.2;
            this.playLevelMusic();
        }
        this.boss_seen = false;
        if(this.approached) {this.boss_approaching_sound.play();}
    }


    checkForBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isCollecting(bottle)) {
                this.removeBottleFromMap(index);
                this.numBottlesCollected++;
            }
        });
    }


    checkForCoins() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isCollecting(coin)) {
                this.removeCoinFromMap(index);
                this.numCoinsCollected++;
            }
        });
    }
     

    // code snippet in part from Firat Yildirim
    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround() && !this.chickenKilled && enemy instanceof Chicken) {
                    this.chickenKilled = true;
                    this.killChickenWithJumpFromTop(enemy, index);
                } else {
                    if(!this.character.isAboveGround()) {
                        this.character.hit()
                        this.healthBar.setPercentage(this.character.energy);
                        this.character.hurt_sound.play();
                        if(this.character.isDead() && !this.gameOver) {
                            this.gameIsOver();
                        }
                    }
                }
            }
        });
    }


    gameIsOver() {
        this.gameOver = true;
        this.gameScreen.classList.add('d-none');
        this.canvas.setAttribute("hidden", "hidden");
        this.touchControls.classList.add('d-none');
        this.musicToggleButton.classList.add('d-none');
        this.bossanova.pause();
        clearAllIntervals();
        if(this.music) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0.0;
        }
        this.youLostScreen.classList.remove('d-none');
        this.you_lost_sound.play();
        this.you_lost = true;
    }


    /**
     * This function is when we jumped on the chicken.
     * 
     * @param {string} enemy 
     */
    killChickenWithJumpFromTop(enemy, index) {
        let y_pos = this.character.y;
        enemy.chickenKilled();
        this.character.acceleration = 2.5;  // perfect 'acceleration'
        this.character.jump(5, false);      // and 'speedY' match
        setTimeout(() => {
            this.eraseEnemyFromArray(index);
            this.character.acceleration = 2.5     // reset acceleration after jumped on enemy
        }, 1000 / 60);
        setTimeout(() => {
        }, 1000 / 30);
    }


    /**
     * This Function clear the current enemy from the Array.
     * 
     * @param {string} index 
     */
    eraseEnemyFromArray(index) {
        if(this.level.enemies[index] instanceof Chicken) {
            this.level.enemies[index].chicken_hurt_sound.play();
            this.level.enemies[index].img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        }
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
            this.chickenKilled = false;
        }, 250);
    }

    // -----------------------------------


    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            if(this.numBottlesCollected > 0 && !this.bottleThrowing){
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(this.bottle);
            this.checkCharacterDirection();
            this.throw_sound.play();
            this.numBottlesCollected -= 1;
            this.bottleThrowing = true;
            }
            else if(this.numBottlesCollected == 0 && !this.bottleThrowing){
                this.no_bottle_sound.play();
            }       
        }
        else if(!this.keyboard.SPACE && this.bottleThrowing) {
            this.bottleThrowing = false;
        }
    }


    checkCharacterDirection() {
        if(this.character.otherDirection) {
            this.bottle.throwLeft(this.character.x + 100, this.character.y + 100);
        }
        else {
            this.bottle.throw(this.character.x + 100, this.character.y + 100);
        }
    }


    CollidingBottleWithEnemy() {
        this.level.enemies.forEach((enemy, index1) => {
            if(enemy instanceof Chicken) {
                this.throwableObjects.forEach((bottle, index2) => {
                    if (bottle.isColliding(enemy) && !this.chickenKilled) {
                        this.chickenKilled = true;
                        setTimeout(() => {
                            this.eraseEnemyFromArray(index1);
                        }, 1000 / 60);
                        setTimeout(() => {
                            this.throwableObjects.splice(index2, 1);
                        }, 100);
                    }
                })
            }
            else if(enemy instanceof EndBoss) {
                this.throwableObjects.forEach((bottle, index2) => {
                    if (bottle.isColliding(enemy) && !this.chickenKilled) {
                        this.throwableObjects.splice(index2, 1);
                        enemy.hit();
                        this.endBossBar.setBossBar(enemy.energy);
                    }
                    this.checkForEnemyDeath(enemy, index1);
                })
            }
        })
    }


    checkForEnemyDeath(enemy, index1) {
        if(enemy.energy == 0) {
            setTimeout(() => {
                this.eraseEnemyFromArray(index1);
                this.setGameOverScreen();
                this.gameOver = true;
                clearAllIntervals();
                this.bossanova.pause();
                if(this.music) {
                    this.backgroundMusic.pause();
                    this.backgroundMusic.currentTime = 0.0;
                }
                this.you_won_sound.play();
            }, 2000);
        }
    }


    setGameOverScreen() {
        this.gameScreen.classList.add('d-none');
        canvas.setAttribute("hidden", "hidden");
        this.touchControls.classList.add('d-none');
        this.musicToggleButton.classList.add('d-none');
        this.youWinScreen.classList.remove('d-none');
    }


    draw() {
        this.cameraAndBackgroundInit();
        if(this.DEBUG_COLLISION) {
            let char_coordinates = `pepe_x: ${this.character.x}  pepe_y: ${this.character.y}`;
            this.ctx.fillText(char_coordinates, 300, 40);
        }
        // ---------- following lines for fixed objects ---------- //
        this.setupStatusTexts();
        this.addGameFigures();
        this.ctx.translate(-this.camera_x, 0);
        
        // draw() wird immer wieder aufgerufen
        let self = this;
        this.idd = requestAnimationFrame(function() {
            self.draw();
        });
    }


    cameraAndBackgroundInit() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }


    setupStatusTexts(){
        this.ctx.font = "36px Ezra SIL";
        this.ctx.fillStyle = "white";
        let coinText = `x${this.numCoinsCollected}`;
        let bottleText = `x${this.numBottlesCollected}`;
        this.ctx.fillText(coinText, 100, 175);
        this.ctx.fillText(bottleText, 100, 115);
    }


    addGameFigures() {
        if(this.level.enemies[0] instanceof EndBoss) {
            this.ctx.fillText(this.level.enemies[0].energy, 800, 40);
        }
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endBossBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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


    removeBottleFromMap(index) {
        this.level.bottles.splice(index, 1);
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