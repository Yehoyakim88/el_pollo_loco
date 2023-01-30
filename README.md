# el_pollo_loco

## To implement:
function resetAllIntervals() {
    for (let i = 1; i < 200; i++){
        window.setInterval(i);
        console.log(i);
    }
}



world.class.js
-.-.-.-.-.-.-.



class World {

    //----------------------------------------------------------
    //----------------------------------------------------------
    // only available in game version 2.0-----------------------
    // delta_x = [0, 0, canvas.width, 0, canvas.width, 0, canvas.width, -canvas_width];
    // characterWalking = false;

    // backgroundImagesA_B = {
    //     0:[],
    //     1:[],
    //     2:[]
    // };
    //----------------------------------------------------------
    //----------------------------------------------------------
    //----------------------------------------------------------

    constructor() {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.backgroundMusic = backgroundMusic;
        // only available in game version 2.0
        // this.getBackgroundImage(2);
        // this.getBackgroundImage(1);
        // this.getBackgroundImage(0);
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
    }
}

// the following lines are for dynamic background layers as seen in the example of Leonardo Michilena:

draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); // comment in again for DA version

        // only available in game version 2.0
        // this.animateLayer(2);   // comment out for DA version
        // this.animateLayer(1);   // comment out for DA version
        // this.animateLayer(0);   // comment out for DA version        
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
        ...


--------


// the following functions are only for game version 2.0
    getBackgroundImage(layer) {
        // console.log('getBackgroundImage')
        let bgImageA = new Image();
        bgImageA.src = `img/background/${layer+1}-1.png`;

        let bgImageB = new Image();
        bgImageB.src = `img/background/${layer+1}-2.png`;

        let bgImageC = new Image();
        bgImageC.src = `img/background/${layer+1}-2.png`;

        this.backgroundImagesA_B[layer].push(bgImageA);
        this.backgroundImagesA_B[layer].push(bgImageB);
        this.backgroundImagesA_B[layer].push(bgImageC);

        // console.log('getBackgroundImage backgroundImagesA_B', backgroundImagesA_B);
        // console.log('getBackgroundImage backgroundImagesA_B[0]', backgroundImagesA_B[0]);
        // console.log('getBackgroundImage backgroundImagesA_B[1]', backgroundImagesA_B[1]);
        // console.log('getBackgroundImage backgroundImagesA_B[2]', backgroundImagesA_B[2]);
    }


    // function only for game version 2.0
    animateLayer(layer) {
        let movSpeed;
        let direction;
        let bgImages = [];
        let index = 2*(Number(layer)) + 1;

        // console.log('animateLayer, this.characterWalking ', this.characterWalking);
        if(this.characterWalking) {
            movSpeed = 9 - 4 * Number(layer);
            // movSpeed = 5;    // only for DEBUG PURPOSE
        }
        else {
            movSpeed = 0;
        }

        console.log('movSpeed: ', movSpeed);
        
        let yOffset = 0 - 50 * layer; // layer_1 -> 0, layer_2 -> -50, layer_3 -> 150
        

        // -50 entspricht + 590, also 

        // console.log('layer ', layer);
        // console.log('index ', index);
        // console.log('index+1 ', index+1);
        // console.log('dynamic ', dynamic);
        // console.log('yOffset ', yOffset);

        if(this.character.otherDirection) {
            direction = 1;
        }
        else {
            direction = -1;
        }
        
        if(direction == 1) {
            if(this.delta_x[index] > canvas_width - movSpeed) {
                this.delta_x[index] = -canvas_width + movSpeed;
            }
            else {
                this.delta_x[index] += movSpeed * direction;
            }

            if(this.delta_x[index+1] > canvas_width - movSpeed) {
                this.delta_x[index+1] = -canvas_width + movSpeed;
            }
            else {
                this.delta_x[index+1] += movSpeed * direction;
            }
        }

        if(direction == -1) {
            if(this.delta_x[index] >= -canvas_width + movSpeed) {
                this.delta_x[index] += movSpeed * direction;
            }
            else {
                this.delta_x[index] = canvas_width - movSpeed;
            }

            if(this.delta_x[index+1] >= -canvas_width + movSpeed) {
                this.delta_x[index+1] += movSpeed * direction;
            }
            else {
                this.delta_x[index+1] = canvas_width - movSpeed;
            }
        }

        this.ctx.drawImage(this.backgroundImagesA_B[layer][0], this.delta_x[index], yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][1], this.delta_x[index+1], yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][2], this.delta_x[index]-this.canvas.width, yOffset, canvas_width, 640);
        this.ctx.drawImage(this.backgroundImagesA_B[layer][0], this.delta_x[index]-2*this.canvas.width, yOffset, canvas_width, 640);
    }