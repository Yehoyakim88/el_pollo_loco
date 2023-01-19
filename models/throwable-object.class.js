class ThrowableObject extends MovableObject {
    

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.width = 70;
        this.height = 80;
        this.x = x;
        this.y = y;
        // this.throw();
    }


    throw(enemy, index) {
        console.log('ThrowableObjects.throw()...');
        if(this.y <= 640) {
            this.speedY = 15;       // this.speedY = 30; before edit
            this.applyGravity();
            setInterval(() => {
                // check for collision with enemy
                this.x += 15;
                this.playAnimation(this.IMAGES)
                // this.x += 20;
            }, 25);
        }
        else {
            this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
        }
    }
}