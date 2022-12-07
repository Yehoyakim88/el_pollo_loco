class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 500;

    constructor(path) {
        super().loadImage(path);
        
        this.x = Math.random() * 500;
    }
}