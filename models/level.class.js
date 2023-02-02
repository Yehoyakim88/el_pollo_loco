class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x;


    constructor(enemies, clouds, backgroundObjects, coins, bottles, end_x) {
        this.level_end_x = end_x;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}