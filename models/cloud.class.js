class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 500;
    last_x = 0;

    constructor(cloudType) {
        super().loadImage(`img/5_background/layers/4_clouds/${cloudType}.png`);
        
        this.x = 50 + 100*Math.random() * 10;
        this.last_x = this.x;
        this.speed = 0.15;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}