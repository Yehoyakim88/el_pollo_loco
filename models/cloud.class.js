class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 500;

    constructor(path) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.x = Math.random() * 500;
    }
}