class Coinbar extends StatusBar {
    IMAGE_COINBAR = 'img/8_coin/coin_1.png';
    DEBUG = false;
    height;
    width;
    x;
    y;


    constructor() {
        super();
        this.loadImage(this.IMAGE_COINBAR);
        this.x = -18;
        this.y = 90;
        this.width = 150;
        this.height = 150;
    }
}