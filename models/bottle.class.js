class Bottle extends MovableObject {
    width = 80;
    height = 100;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/salsa_bottle.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];


    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_IMAGES);
        // this.x = 100 + 20000 * Math.random();   // Random number for x between 200 and 700;
        // this.x = 20000 * Math.random();   // Random number for x between 200 and 700;
        this.x = 4400 - 200 - 20000 * Math.random() + 20;
        this.y = 400 - Math.random() * 300;         // and for y between 200 and 400
    }
}