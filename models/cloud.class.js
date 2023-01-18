class Cloud extends MovableObject {
    DEBUG = false;
    y = 20;
    width = 500;
    height = 500;
    // width = 0.78125*canvas.width;
    // height = 0.78125*canvas.height;
    
    
    last_x = 0;

    constructor(cloudType) {
        super().loadImage(`img/5_background/layers/4_clouds/${cloudType}.png`);
        
        this.x = 50 + 100*Math.random() * 10;
        this.last_x = this.x;
        this.speed = 0.15;

        if(this.DEBUG) {
            console.log('Cloud x: ', this.x);
            console.log('Cloud y: ', this.y);
            console.log('Cloud width: ', this.width);
            console.log('Cloud height: ', this.height);
        }
        
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}