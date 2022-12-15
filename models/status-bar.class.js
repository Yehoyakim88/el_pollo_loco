class StatusBar extends DrawableObject {

    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'
    ];

    precentage = 100;


    constructor() {
        super().loadImages(IMAGES);
    }


    setPercentage(perecentage) {
        this.percentage = perecentage;
    }


    resolveImageIndex() {
        if(this.percentage == 100) {
            return 0;
        }else if(this.percentage > 80) {
            return 1;
        }else if(this.percentage > 60) {
            return 2;
        }else if(this.percentage > 40) {
            return 3;
        }else if(this.percentage > 20) {
            return 4;
        }else {
            return 5;
        }
    }
}