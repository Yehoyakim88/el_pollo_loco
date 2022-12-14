class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 500;

    constructor(path) {
        super().loadImage(path);
        
        this.x = Math.random() * 500;
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