class Chicken extends MovableObject {
    DEBUG = true;
    y = 465;
    height = 90;
    width = 110;
    bottom = this.y + this.height;

    // height = canvas_height - 550;
    // width = canvas_width - 1170;

    // code snippet from Firat Yildirim
    x = 120;
    // y = 340;
    // width = 60;
    // height = 100;
    // ---------------------------------
    energy = 5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    // --------------------------------

    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x_pos) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        
        // this.x = 500 + Math.random() * 1000; // Zufallszahl zwischen 200 und 700
        this.x = x_pos;
        this.speed = 0.15 + Math.random() * 0.5;
        // console.log('chicken constructor, this.speed: ', this.speed);

        console.log('Chicken x: ', this.x);
        console.log('Chicken y: ', this.y);
        console.log('Chicken width: ', this.width);
        console.log('Chicken height: ', this.height);
        if(!this.DEBUG) {this.animate();}
        
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}