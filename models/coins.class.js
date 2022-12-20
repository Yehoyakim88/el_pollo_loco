class Coin extends MovableObject {
    width = 200;
    height = 200;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 200 + 20000 * Math.random();   // Random number for x between 200 and 700;
        this.y = 400 - Math.random() * 300;         // and for y between 200 and 400
        // this.x = 1750;                                // only for testing
        // this.y = 480;                                 // only for testing
        // console.log('coin at x: ', this.x);
        // console.log('and at y: ', this.y);
        this.animate();
    }


    animate() {
        
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 250);
    }
}