/*
This file contains the script to run the actual game logic of the tetris game.
*/

class TetrisScene extends Phaser.Scene{//tells the game engine which scene this file contains

    constructor(){
        super("TetrisScene");
    }


preload () // preloads all the assets at games initialisation
{
    console.log("Preload")
    this.load.image('bgimage', 'Assets/bgimage.png');
    this.load.image('title', 'Assets/Title.png');
    this.load.image('next', 'Assets/next.png');
    this.load.image('group', 'Assets/group20.png');
    this.load.image('borderblock', 'Assets/borderblock.png');
    this.load.image('testblock', 'Assets/borderblock.png');
    this.load.image('leftlblock', 'Assets/leftlblockfull.png');
    this.load.image('leftzigblock', 'Assets/leftzigblockfull.png');
    this.load.image('rightlblock', 'Assets/rightlblockfull.png');
    this.load.image('rightzigblock', 'Assets/rightzigblockfull.png');
    this.load.image('squareblock', 'Assets/squareblockfull.png');
    this.load.image('straightblock', 'Assets/straightblockfull.png');
    this.load.image('tblock', 'Assets/tblockfull.png');
}

create ()//the game engines create function, it runs static code that doesnt require updating
{   
    console.log("Create")//debugging comment to show current game step

    let createGUI = () =>{ //function that builds the graphical interface, such as background, text and title images
        this.add.image(0, 0, 'bgimage').setOrigin(0,0); 
        this.add.rectangle(fieldCords[0], fieldCords[1]+(blockSize*2.5), gameSizeWidth*blockSize,gameSizeHeight*blockSize, 0x737373).setOrigin(0,0);
        var title = this.add.image(config.width/2, 70, 'title')
        title.setScale(0.75);
        var grouptext = this.add.image(config.width/2+125, 195, 'group')
        grouptext.setScale(0.4);
        this.add.rectangle(fieldCords[0]+gameSizeWidth*blockSize+25, fieldCords[1]+(blockSize*2.5), gameSizeWidth*blockSize,gameSizeHeight*blockSize - 100, 0x737373).setOrigin(0,0);
        var next = this.add.image(fieldCords[0]+gameSizeWidth*blockSize+100, fieldCords[1]+(blockSize*2.5+85), 'next')
        next.setScale(0.35)
        scoretext = this.add.text(fieldCords[0]+gameSizeWidth*blockSize+75, fieldCords[1]+(blockSize*2.5+180))
        scoretext.setScale((1.5))
        leveltext = this.add.text(fieldCords[0]+gameSizeWidth*blockSize+75, fieldCords[1]+(blockSize*2.5+220))
        leveltext.setScale((1.5))
        linetext = this.add.text(fieldCords[0]+gameSizeWidth*blockSize+75, fieldCords[1]+(blockSize*2.5+260))
        linetext.setScale((1.5))
        gametypetext = this.add.text(fieldCords[0]+gameSizeWidth*blockSize+75, fieldCords[1]+(blockSize*2.5+300))
        gametypetext.setScale((1.5))
        modetext = this.add.text(fieldCords[0]+gameSizeWidth*blockSize+75, fieldCords[1]+(blockSize*2.5+340))
        modetext.setScale((1.5))
    }
    
    let createFieldArray = () => {//fills the array with a matrix the size of the game field
        for(var i = 0; i < gameSizeHeight + 4; i++){
            var column = [];
            for(var j = 0; j < gameSizeWidth + 2; j++) {
                column.push(0);
            }
            fieldArray.push(column);
        }
    }
    

    let createGamefield = (x, y) => {//creates a border around the gamefield with grey blocks
        for (var i = 0; i < fieldArray.length; i++){
            fieldArray[i][0] = 1
            fieldArray[i][gameSizeWidth + 2] = 1
            if (i > 2){
                this.add.image(x, y + (i*blockSize), 'borderblock');
                this.add.image(x+(gameSizeWidth*blockSize), y + (i*blockSize), 'borderblock');
            }
            for (var j = 0; j < gameSizeWidth+1; j++){
                this.add.image(x+(j*blockSize),y+((gameSizeHeight+3)*blockSize),'borderblock');
                fieldArray[gameSizeHeight+3][j] = 1    
            }
        }
    }
    let createTestGamefield = (x, y) => {//creates a border around the gamefield with grey blocks
        for (var i = 0; i < fieldArray.length; i++){
            fieldArray[i][0] = 1
            fieldArray[i][gameSizeWidth + 2] = 1
            if (i > 2){
                this.add.image(x, y + (i*(blockSize*0.25)), 'borderblock').setScale(0.25);
                this.add.image(x+(gameSizeWidth*(blockSize*0.25)), y + (i*(blockSize*0.25)), 'borderblock').setScale(0.25);

            }
            for (var j = 0; j < gameSizeWidth+1; j++){
                this.add.image(x+(j*(blockSize*0.25)),y+((gameSizeHeight+3)*(blockSize*0.25)),'borderblock').setScale(0.25);
                
                fieldArray[gameSizeHeight+3][j] = 1    
            }
        }
    }

    let createTetromino = (piece, x, y) => {//creates the initial tetromino, note: need to figure out how to make global for use in update()
        if (piece == 2){//checks for the straight as its point of origin has to be adjusted by the game engine for correct rotation point.
            this.tetromino = new Phaser.Physics.Matter.Sprite(this.matter.world, (x + blockOrigins[piece][0]), (y + blockOrigins[piece][1]), blockTextures[piece]).setOrigin(0.5,0.375)
        }
        else{
            this.tetromino = new Phaser.Physics.Matter.Sprite(this.matter.world, (x + blockOrigins[piece][0]), (y + blockOrigins[piece][1]), blockTextures[piece]);
        }
        this.add.existing(this.tetromino);
        for (var i = 0; i < blockPosition[piece].length; i++){
            var iterBlockPosX = blockPosition[piece][i][0] + Math.floor((gameSizeWidth+2)/2);
            var iterBlockPosY = blockPosition[piece][i][1]+3;
            currentPosition.push([iterBlockPosX,iterBlockPosY]);
        }

    }

    let pauseMenu = () => {//creates and handles function of the pause menu
        var escBg = this.add.rectangle(config.width/2, config.height/2, config.width/3, config.height/3,  0x464646, 30)
        var quitText = this.add.text(config.width/2 - 75, config.height/2 - 100, 'Quit?', { fill: '#ffffff'});
        quitText.setFontSize(60)
        var quitButtonText = this.add.text(config.width/2 + 50, config.height/2+50, 'Yes', { fill: '#ffffff' });
        quitButtonText.setFontSize(60)
        quitButtonText.setInteractive({ useHandCursor: true });
        quitButtonText.on('pointerdown', () => this.scene.start("StartupScene"));
        var cancelButtonText = this.add.text(config.width/2-125, config.height/2+50, 'No', { fill: '#ffffff' });
        cancelButtonText.setFontSize(60)
        cancelButtonText.setInteractive({ useHandCursor: true });
        cancelButtonText.on('pointerdown', () => pauseMenuCont.setVisible(false), pauseState = false);
        var pauseMenuCont = this.add.container(0,0, [escBg,quitText,quitButtonText,cancelButtonText])
        pauseMenuCont.setVisible(false);

        return pauseMenuCont
    }
    


    currentPiece = Math.floor(Math.random() * numberOfPieces);//picks a random number relative to the tetris pieces available
    nextPiece = Math.floor(Math.random() * numberOfPieces);

    //initalising all the starting functions
    createGUI()
    createFieldArray()//
    createGamefield(fieldCords[0], fieldCords[1])
    //createTestGamefield(950, 750)
    createTetromino(currentPiece, pieceStartPoint[0], pieceStartPoint[1]);
    nextPieceImage = this.add.image(fieldCords[0]+gameSizeWidth*blockSize+225, fieldCords[1]+(blockSize*2.5+90), blockTextures[nextPiece])
    controls = this.input.keyboard.createCursorKeys();//variable to hold the array of available interaction keys
    console.log(fieldArray)//debug message to check the matrix has been correctly been drawn
    timedEvent = this.time.addEvent({ delay: gameSpeed, callback: onEvent, callbackScope: this, loop : true});//the game timer
    var pauseMenuCont = pauseMenu()

    this.input.keyboard.on('keydown-ESC', function (event) {//displays the pause menu with 'ESC' which is set to invisible by default
        if (!pauseState){
            pauseState = true;
            pauseMenuCont.setVisible(true);
            
        }else if(pauseState){
            pauseMenuCont.setVisible(false);
            pauseState = false;
        }
    
    });
    this.input.keyboard.on('keydown-P', function (event) {//displays the pause menu with 'ESC' which is set to invisible by default
        if (!pauseState){
            pauseState = true;
            
        }else if(pauseState){
            pauseState = false;
        }
    
    });

    this.input.keyboard.on('keydown-m', function (event) {//mutes sound when 'm' is pressed, note: sound still need to be added
        if (!mutedSound){
            mutedSound = true;
            
        }else{
            mutedSound = false;
        }
    
    });
}



update ()//updates the game engine at 60 fps
{   
    var tetrominoVelocity = new Phaser.Math.Vector2();//declares how the tetromino will move in accordance to the physics engine
    var nothing = [];//these two lines disable the colliding function of the physics engine as the array matrix controls the collision
    this.tetromino.setCollidesWith(nothing)

    //creates dynamic text that updates when needed
    scoretext.setText('Score: '+ currentGameScore)
    leveltext.setText('Level: '+ level)
    linetext.setText('Lines Cleared: '+ linesCleared)
    if (!extended){
        gametypetext.setText('Normal Game')
    }else{
        gametypetext.setText('Extended Game')
    }
    if (!aiMode){
        modetext.setText('Player Mode')
    }else{
        modetext.setText('AI Mode')
    }


    if (this.input.keyboard.checkDown(controls.left, 250))//moves the tetromino left when the left arrow key is pressed, with a 250ms delay inbetween
    {
        canMove = false
        for (var i = 0; i < currentPosition.length; i++){//checks if there is an obstacle and stops the input if there is
            var nextPosX = fieldArray[(currentPosition[i][1])][(currentPosition[i][0])-2];

            if (nextPosX == 1){
                console.log("im not supposed to move now")//debug comment
                canMove = false;
                break
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){
            canMove = false
            for (var i = 0; i < currentPosition.length; i++){//moves the block to the left and updates the current position
                currentPosition[i][0] -= 1;
                console.log(currentPosition)
            }
            tetrominoVelocity.x -= 32
            canMove = true
        }
        canMove = true
    }
        
        
    else if (this.input.keyboard.checkDown(controls.right, 250))//moves the tetromino right when the right arrow is pressed, with a 250ms delay inbetween
    {
        canMove = false
        for (var i = 0; i < currentPosition.length; i++){//checks if there is an obstacle and stops the input if there is
            var nextPosX = fieldArray[(currentPosition[i][1])][(currentPosition[i][0])+2];

            if (nextPosX == 1){
                console.log("im not supposed to move now")//debug comment
                canMove = false;
                break
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){//moves the block to the right and updates the current position
            canMove = false
            for (var i = 0; i < currentPosition.length; i++){
                currentPosition[i][0] += 1; 
                console.log(currentPosition)  
            }
            tetrominoVelocity.x += 32
            canMove = true
        }
        canMove = true
    }

    else if (this.input.keyboard.checkDown(controls.up, 450)){//rotates the block when the up arrow is pressed, with a 450ms delay inbetween
        
        if(r270){//checks which rotation stage the piece is on, listed backwards to avoid it triggering twice when the state changes
            var newXPos = [];
            var newYPos = [];
            canMove = false;
            for (var i = 0; i < blockPosition[currentPiece].length; i++){//takes away the previous matrix position and adds the next rotation positions 
                var iterRotX = currentPosition[i][0] - rotation3[currentPiece][i][0];
                var iterRotY = currentPosition[i][1] - rotation3[currentPiece][i][1];
                newXPos.push(iterRotX + blockPosition[currentPiece][i][0]);
                newYPos.push(iterRotY + blockPosition[currentPiece][i][1]);
            } 

            for (var i = 0; i < blockPosition[currentPiece].length; i++){//makes sure there is room to rotate
                if (fieldArray[newYPos[i]][newXPos[i]] == 1) {
                    canMove = false;
                    console.log("im not supposed to move now")
                    break;
                }
                else{
                    r270 = false;//changes rotation state
                    r0 = true; 
                    canMove = true;                   
                }   
            }
        }

        else if(r180){//checks which rotation stage the piece is on, listed backwards to avoid it triggering twice when the state changes
                        //Note: reduce redundancy
            var newXPos = [];
            var newYPos = [];
            canMove = false
            for (var i = 0; i < blockPosition[currentPiece].length; i++){//takes away the previous matrix position and adds the next rotation positions
                var iterRotX = currentPosition[i][0] - rotation2[currentPiece][i][0];
                var iterRotY = currentPosition[i][1] - rotation2[currentPiece][i][1];
                newXPos.push(iterRotX + rotation3[currentPiece][i][0]);
                newYPos.push(iterRotY + rotation3[currentPiece][i][1]);
            } 

            for (var i = 0; i < blockPosition[currentPiece].length; i++){//makes sure there is room to rotate
                if (fieldArray[newYPos[i]][newXPos[i]] == 1) {
                    canMove = false;
                    console.log("im not supposed to move now")
                    break;
                }
                else{
                    r180 = false;//changes rotation state
                    r270 = true;
                    canMove = true;
                }   
            }
        }
        else if(r90){//checks which rotation stage the piece is on, listed backwards to avoid it triggering twice when the state changes
            var newXPos = [];
            var newYPos = [];
            canMove = false;
            for (var i = 0; i < blockPosition[currentPiece].length; i++){//takes away the previous matrix position and adds the next rotation positions
                var iterRotX = currentPosition[i][0] - rotation1[currentPiece][i][0];
                var iterRotY = currentPosition[i][1] - rotation1[currentPiece][i][1];
                newXPos.push(iterRotX + rotation2[currentPiece][i][0]);
                newYPos.push(iterRotY + rotation2[currentPiece][i][1]);
            } 

            for (var i = 0; i < blockPosition[currentPiece].length; i++){//makes sure there is room to rotate
                if (fieldArray[newYPos[i]][newXPos[i]] == 1) {
                    canMove = false;
                    console.log("im not supposed to move now")
                    break;
                }
                else{
                    r90 = false;//changes rotation state
                    r180 = true; 
                    canMove = true;                  
                }   
            } 
        }
        else if(r0){//checks which rotation stage the piece is on, listed backwards to avoid it triggering twice when the state changes
            var newXPos = [];
            var newYPos = [];
            canMove = false
            for (var i = 0; i < blockPosition[currentPiece].length; i++){//takes away the previous matrix position and adds the next rotation positions
                var iterRotX = currentPosition[i][0] - blockPosition[currentPiece][i][0];
                var iterRotY = currentPosition[i][1] - blockPosition[currentPiece][i][1];
                newXPos.push(iterRotX + rotation1[currentPiece][i][0]);
                newYPos.push(iterRotY + rotation1[currentPiece][i][1]);
            }            

            for (var i = 0; i < blockPosition[currentPiece].length; i++){//makes sure there is room to rotate
                if (fieldArray[newYPos[i]][newXPos[i]] == 1) {
                    canMove = false;
                    console.log("im not supposed to move now")
                    break;
                }
                else{
                    r0 = false;//changes rotation state
                    r90 = true; 
                    canMove = true;                   
                }   
            }         
        }
        

        
        if (canMove && !pauseState){//rotates the tetris piece clockwise and updates the matrix positions
            canMove = false
            this.time.addEvent(timedEvent)
            currentPosition = [];
                for (var i = 0; i < blockPosition[currentPiece].length; i++){
                        currentPosition.push([newXPos[i], newYPos[i]]);
                } 
            this.tetromino.angle += 90;
            canMove = true     
        }
       
        }
        
        else if(this.input.keyboard.checkDown(controls.down, 150)){//moves the piece down when the down arrow is pressed, with a delay of 150ms in between
            for (var i = 0; i < currentPosition.length; i++){//updates matrix position
                var nextPosY = fieldArray[(currentPosition[i][1])+1][(currentPosition[i][0])];

                if (nextPosY == 1){//checks for obstacles
                    console.log("im not supposed to move now")//debug comment
                    canMove = false;
                    break;
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){
            canMove = false
            for (var i = 0; i < currentPosition.length; i++){//moves the piece down and updates matrix
                this.time.addEvent(timedEvent);
                currentPosition[i][1] += 1;
                console.log(currentPosition)
            }
            tetrominoVelocity.y += 32
            canMove = true
        }
    }
    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);//tells the physics engine the tetris piece will travel on 2 axis

    if (pieceSwap){//pause the timer and does all the processing needed inbetween pieces, note: make functions for each process, current problem = scope limitations
        this.tetromino.setActive(false)//these two lines deactivate the players and physics engines control over the current tetromino
        this.tetromino.setStatic(true)
        for (var i = 0; i < blockPosition[currentPiece].length; i++){//saves the current position into the field array, making it an obstacle and part of the game field
            fieldArray[currentPosition[i][1]][currentPosition[i][0]] = 1;
        }
        r0 = true
        r90 = false
        r180 = false
        r270 = false
        //the following section is a copy of the createTetromino() function, requires a global function or class but current issues with scope
        var x = pieceStartPoint[0];
        var y = pieceStartPoint[1];
        currentPosition = []
        if (nextPiece == 2){
            this.tetromino = new Phaser.Physics.Matter.Sprite(this.matter.world, (x + blockOrigins[nextPiece][0]), (y + blockOrigins[nextPiece][1]), blockTextures[nextPiece]).setOrigin(0.5,0.375)
        }
        else{
            this.tetromino = new Phaser.Physics.Matter.Sprite(this.matter.world, (x + blockOrigins[nextPiece][0]), (y + blockOrigins[nextPiece][1]), blockTextures[nextPiece]);
        }
        this.add.existing(this.tetromino);
        for (var i = 0; i < blockPosition[nextPiece].length; i++){
            var iterBlockPosX = blockPosition[nextPiece][i][0] + Math.floor((gameSizeWidth+2)/2);
            var iterBlockPosY = blockPosition[nextPiece][i][1]+3;
            currentPosition.push([iterBlockPosX,iterBlockPosY]);
        }
        

        //replace the next piece display, Note: needs function
        nextPieceImage.destroy();
        currentPiece = nextPiece
        nextPiece = Math.floor(Math.random() * numberOfPieces);
        nextPieceImage = this.add.image(fieldCords[0]+gameSizeWidth*blockSize+225, fieldCords[1]+(blockSize*2.5+90), blockTextures[nextPiece])

        
        pieceSwap = false;//resumes timer


    }
/*
    for (var i = 0; i < fieldArray.length; i++){
        for (var j = 0; j < gameSizeWidth+1; j++){
            if (fieldArray[i][j] == 1)
                this.add.image(900+(j*(blockSize*0.25)), 750+(i*(blockSize*0.25)), 'borderblock').setScale(0.25);
        }
    }
*/
}

}

function onEvent()//function for timer processing
{
    var tetrominoVelocity = new Phaser.Math.Vector2();//reinitialising the physics engine so its in scope
    for (var i = 0; i < currentPosition.length; i++){//checks to see if the piece can move down
        var nextPosX = fieldArray[(currentPosition[i][1])+1][(currentPosition[i][0])];

        if (nextPosX == 1  && !pauseState){//if the piece can't move, the tetromino becomes inactive and new one spawns
            canMove = false;
            
            pieceSwap = true;
            break
        }else{
            canMove = true;
        }
    }

    if (canMove && !pauseState){// if the piece can move and the timer runs out, move down a space
        canMove = false
        this.time.addEvent(timedEvent);
        for (var i = 0; i < currentPosition.length; i++){
            currentPosition[i][1] += 1;
            console.log(currentPosition)
        }
        tetrominoVelocity.y += 32
        canMove = true
    }
    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);//same as in update(), just reinitalisting to keep in scope
}
