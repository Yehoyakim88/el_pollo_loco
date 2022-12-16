class StatusBar extends DrawableObject {
    height = 50;
    width = 200;

    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',   // 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'      // 5
    ];

    precentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 20;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
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