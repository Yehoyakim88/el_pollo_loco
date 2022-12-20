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
        this.x = 50 + Math.random() * 1000; // Zufallszahl fuer x zwischen 200 und 700;
        this.y = 400 - Math.random() * 200; // und fuer y zwischen 200 und 400
        this.animate();
    }


    animate() {
        
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 250);
    }
}