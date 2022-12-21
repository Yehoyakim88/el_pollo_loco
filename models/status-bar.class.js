class StatusBar extends DrawableObject {
    height = 50;
    width = 200;

    IMAGES_HEALTHBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',   // 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'      // 5
    ];

    IMAGE_BOTTLEBAR = './img/7_statusbars/3_icons/icon_salsa_bottle.png';

    IMAGE_COINBAR = 'img/8_coin/coin_1.png';

    precentage = 100;


    constructor(barType) {
        if(barType == 'health') {
            console.log('statusBar for health to add...');
            super();
            this.loadImages(this.IMAGES_HEALTHBAR);
            this.x = 40;
            this.y = 20;
            this.setPercentage(100);
        }
        else if(barType == 'bottle') {
            console.log('statusBar for coins to add...')
            super().loadImage(this.IMAGE_BOTTLEBAR);
            // this.setBottleImage();
            this.x = 20;
            this.y = 70;
            this.height = 60;
            this.width = 70;
        }
        else if(barType == 'coins') {
            super().loadImage(this.IMAGE_COINBAR);
            this.x = -18;
            this.y = 90;
            this.width = 150;
            this.height = 150;

        }
        // this.setBottleImage();
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
        console.log('setPercentage(), this.img: ', this.img);
        console.log('imagePath: ', imagePath);
    }


    resolveImageIndex() {
        if(this.percentage == 100) {
            return 0;
        }else if(this.percentage >= 80) {
            return 1;
        }else if(this.percentage >= 60) {
            return 2;
        }else if(this.percentage >= 40) {
            return 3;
        }else if(this.percentage >= 20) {
            return 4;
        }else {
            return 5;
        }
    }
}