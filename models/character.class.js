class Character extends MovableObject {
    y = 260;
    x = 120;
    height = 300;
    // speed = 12;         // character's speed before edit
    speed = 6;
    framerate = 50;

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
    walking_sound = new Audio('./audio/step.mp3');
    hurt_sound = new Audio('./audio/pain.mp3');
    coin_sound = new Audio('./audio/coin.mp3');
    jump_sound = new Audio('./audio/jumpy-sonikku_short.mp3');
    dies_sound = new Audio('./audio/whuuaaaaaaaaa_1.mp3');
    died_sound = new Audio('./audio/lose1.mp3');
    alreadyDead = false;
    snoreTimer = 0;
    isSnoring = false;
    jumpStartTime;
    jumpEndTime;
    jumpDuration;
    isJumping = false;
    jumpAction = false;

    // offset = {
    //     top: 120,
    //     bottom: 30,
    //     left: 40,
    //     right: 30
    // };
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();    // implemented for testing
        this.animate();
    }


    animate() {
        console.log('animate() is running...');

        setInterval(() => {

            // console.log('snoreTimer value: ', this.snoreTimer);

            if(this.snoreTimer > 19) {
                this.isSnoring = true;
                this.snoreTimer = 0;
            }

            if(this.isSnoring) {
                console.log('LONG IDLE !!!');
                this.setCharacterLongIdle();
            }


            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.world.characterWalking = true;
                this.isSnoring = false;
                this.snoreTimer = 0;
            }
            else {
                this.world.characterWalking = false;
                
                if(!this.isSnoring && !this.isAboveGround()) {
                    this.setCharacterIdle();
                    this.snoreTimer++;}
            }
            
        }, 500);
        
        setInterval(() => {
            this.walking_sound.pause();

            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
            }
            
            if(this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.walking_sound.play();
            }

            if(this.world.keyboard.UP && !this.isAboveGround()) {
                this.jumpStartTime = new Date();
                console.log('Jump start time: ', Math.round(this.jumpStartTime/1000));
                this.jump();
                console.log('ABSPRUNG!');
                this.jumpAction = true;
                this.isSnoring = false;
                this.snoreTimer = 0;
                // this.framerate = 250;
                // setTimeout(() => {console.log('.')}, 100);
            }

            if(this.jumpAction && this.y == 260 && !this.world.keyboard.UP) {
                console.log('GELAAAANDEEEEEEEET');
                this.jumpAction = false;
                this.jumpEndTime = new Date();
                this.jumpDuration = this.jumpEndTime - this.jumpStartTime;
                // this.jumpDuration /= 1000;
                this.jumpDuration = Math.round(this.jumpDuration);
                console.log('Jump duration: ', this.jumpDuration);
            }

            this.world.camera_x = - this.x + 100;            
        }, 1000 / 60);   // original: 1000 / 60

        setInterval(() => {
            if(this.isDead() && !this.alreadyDead) {
                console.log('this.playAnimation(this.IMAGES_DEAD);');
                this.alreadyDead = true;
                this.playAnimation(this.IMAGES_DEAD);
                // this.dies_sound.play();
                // this.died_sound.play();
                // return;
            }
        }, 500);

        setInterval(() => {
            // console.log('this.framerate: ', this.framerate);
            // if(this.isDead() && !this.alreadyDead) {
            //     this.alreadyDead = true;
            //     this.playAnimation(this.IMAGES_DEAD);
            //     this.dies_sound.play();
            //     this.died_sound.play();
            //     // return;
            // }
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.isAboveGround()) {
                
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 130); // original 50
    }


    jump() {
        this.speedY = 40; // original
        this.jump_sound.play();
        // this.speedY = 2; // for testing
    }
}