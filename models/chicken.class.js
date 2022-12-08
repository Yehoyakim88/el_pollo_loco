class Chicken extends MovableObject {
    height = 150;
    width = 150;
    y = 415;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        
        this.x = 200 + Math.random() * 500; // Zufallszahl zwischen 200 und 700
    }
}