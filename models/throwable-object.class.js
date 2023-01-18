class ThrowableObject extends MovableObject {
    

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.width = 70;
        this.height = 80;
        this.x = x;
        this.y = y;
        // this.throw();
    }


    throw() {
        this.speedY = 15;       // this.speedY = 30; before edit
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
            this.playAnimation(this.IMAGES)

            // this.x += 20;
        }, 25);
    }
}