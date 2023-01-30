class Chicken extends MovableObject {
    DEBUG = false;
    y = 465;
    height = 90;
    width = 110;
    bottom = this.y + this.height;
    x = 120;
    energy = 5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    chicken_hurt_sound = new Audio('audio/chicken_hurt.mp3');


    constructor(x_pos) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x_pos;
        this.speed = 0.15 + Math.random() * 0.5;
        if(!this.DEBUG) {this.animate();}
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}