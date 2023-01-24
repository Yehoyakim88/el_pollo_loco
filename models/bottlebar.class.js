class BottleBar extends StatusBar{
    DEBUG = false;
    IMAGE_BOTTLEBAR = './img/7_statusbars/3_icons/icon_salsa_bottle.png';
    height;
    width;
    x;
    y;


    constructor() {
        super();
        this.loadImage(this.IMAGE_BOTTLEBAR);
        this.x = 20;
        this.y = 70;
        this.height = 60;
        this.width = 70;
    }
} 