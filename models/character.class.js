class Character extends MovableObject {
    DEBUG = false;
    y = 260;                        // or y = 0.40625*canvas_height;
    x = 100;
    height = 300;
    bottom = this.y + this.height;
    speed = 6;                      // character's speed before edit: 12
    framerate = 50;
    offset = {
        top: 70,
        bottom: 10,
        left: 35,
        right: 35,
    }
    // -----------------------

    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walking_sound = new Audio('audio/step_new.mp3');
    hurt_sound = new Audio('./audio/pain.mp3');
    coin_sound = new Audio('./audio/coin.mp3');
    bottle_sound = new Audio('./audio/bottlecollecting.mp3');
    jump_sound = new Audio('./audio/jumpy-sonikku_short.mp3');
    dies_sound = new Audio('./audio/whuuaaaaaaaaa_1.mp3');
    died_sound = new Audio('./audio/lose1.mp3');
    snore_sound = new Audio('./audio/snoring.mp3');
    alreadyDead = false;
    snoreTimer = 0;
    isSnoring = false;
    snoreLogSet = false;
    jumpStartTime;
    jumpEndTime;
    jumpDuration;
    isJumping = false;
    jumpAction = false;
    userInteraction = false;
  

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();            // implemented for testing       
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.snoreFunctionality();
        }, 250);                        // before edit 500
        setInterval(() => {
            this.checkForPepeMove();
            this.world.camera_x = - this.x + 100;            
        }, 1000 / 60);                  // original: 1000 / 60

        this.checkForDeath();
        this.checkForHurt();
    }


    snoreFunctionality() {
        if(this.snoreTimer > 59) {
            this.isSnoring = true;
            this.snoreTimer = 0;
        }
        if(this.isSnoring) {
            if(!this.snoreLogSet) {
                this.snoreLogSet = true;
            }
            this.setCharacterLongIdle();
            this.snore_sound.play();
        }

        this.checkForDisruptionOfSnoring();
    }


    checkForDisruptionOfSnoring() {
        if(this.checkForUserRequest()) {
            this.userInteraction = true;
            this.snoreTimer = 0;
            this.isSnoring = false;
            this.snore_sound.pause();
            this.snore_sound.currentTime = 0;
        }
        if(this.checkForMoveLeftRight()) {
            this.world.characterWalking = true;
        }
        else {
            this.world.characterWalking = false;
            if(this.checkForIdleConditions()) {
                this.setCharacterIdle();
                this.snoreTimer++;}
        }
    }


    checkForIdleConditions() {
        return !this.isSnoring 
        && !this.isAboveGround() 
        && this.userInteraction;
    }


    checkForMoveLeftRight() {
        return this.world.keyboard.RIGHT || 
        this.world.keyboard.LEFT;
    }


    checkForUserRequest() {
        return this.world.keyboard.RIGHT || 
        this.world.keyboard.LEFT ||
        this.world.keyboard.SPACE || 
        this.world.keyboard.UP;
    }


    checkForPepeMove() {
        this.walking_sound.pause();
        this.checkWalkingDirection();
        this.checkForJump();
    }


    checkWalkingDirection() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            if(!this.world.keyboard.UP && !this.isAboveGround()) {
                this.walking_sound.play();
            }
        }
        if(this.world.keyboard.LEFT && this.x > 100) {
            this.moveLeft();
            if(!this.world.keyboard.UP && !this.isAboveGround()) {
                this.walking_sound.play();
            }
        }
    }


    checkForJump() {
        if(this.world.keyboard.UP && !this.isAboveGround()) {
            this.jumpStartTime = new Date();
            this.jump();
            this.jumpAction = true;
        }
        if(this.jumpAction && this.y == 260 && !this.world.keyboard.UP) {
            this.jumpAction = false;
            this.jumpEndTime = new Date();
            this.jumpDuration = this.jumpEndTime - this.jumpStartTime;
            this.jumpDuration = Math.round(this.jumpDuration);
        }
    }


    checkForDeath() {
        setInterval(() => {
            if(this.isDead() && !this.alreadyDead) {
                console.log('Pepe died :((();');
                this.alreadyDead = true;
                this.playAnimation(this.IMAGES_DEAD);
                // this.dies_sound.play();
                // this.died_sound.play();
                // return;
            }
        }, 500);
    }


    checkForHurt() {
        setInterval(() => {
            if(this.isHurt() && !this.jumpAction && !this.world.characterWalking) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.isAboveGround()) {
                
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);                // Walk animation
                }
            }
        }, 130);                                                            // original 50
    }


    jump(theSpeed=30, sound_on=true) {
        this.speedY = theSpeed;                                             // original 40
        if(sound_on) {this.jump_sound.play();}
        
        this.jump_sound.currentTime = 0;
    }
}