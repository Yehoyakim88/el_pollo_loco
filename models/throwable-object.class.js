class ThrowableObject extends MovableObject {
    

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.width = 50;
        this.height = 60;
        this.x = 100;
        this.y = 100;
        // this.throw(100, 150);
    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}