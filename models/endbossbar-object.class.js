class EndBossBar extends StatusBar {

    x = 700;
    y = 10;
    height = 100;
    width = 400;
    percentage = 50;

    IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/boss-bar-1.png',
        'img/7_statusbars/2_statusbar_endboss/boss-bar-2.png',
        'img/7_statusbars/2_statusbar_endboss/boss-bar-3.png',
        'img/7_statusbars/2_statusbar_endboss/boss-bar-4.png',
        'img/7_statusbars/2_statusbar_endboss/boss-bar-5.png',
        'img/7_statusbars/2_statusbar_endboss/boss-bar-6.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOSSBAR[0]);
        this.loadImages(this.IMAGES_BOSSBAR);
    }


    setBossBar(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    resolveImageIndex() {
        if(this.percentage > 40) {
            return 0;
        }else if(this.percentage > 30) {
            return 1;
        }else if(this.percentage > 20) {
            return 2;
        }else if(this.percentage > 10) {
            return 3;
        }else if(this.percentage <= 10 && this.percentage > 0) {
            return 4;
        }else {
            return 5;
        }
    }
}