class Coin extends MovableObject {
    DEBUG = false;
    width = 200;
    height = 200;

    // width = 0.15625*canvas_width;
    // height = 0.3125*canvas_height;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        // this.x = 200 + 20000 * Math.random();   // Random number for x between 200 and 700;
        this.x = 4400 - 200 - 20000 * Math.random() + 100;   // Random number for x between 200 and 700;
        // this.y = 400 - Math.random() * 300;         // and for y between 200 and 400        
        this.animate();
    }


    animate() {
        
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 250);
    }
}