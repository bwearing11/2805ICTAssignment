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
    this.load.html('scoreform', 'assets/scoreform.html');
    this.load.image('bgimage', 'Assets/bgimage.png');
    this.load.image('title', 'Assets/Title.png');
    this.load.image('next', 'Assets/next.png');
    this.load.image('group', 'Assets/group20.png');
    this.load.image('borderblock', 'Assets/borderblock.png');
    this.load.image('leftlblock', 'Assets/leftlblockfull.png');
    this.load.image('leftzigblock', 'Assets/leftzigblockfull.png');
    this.load.image('rightlblock', 'Assets/rightlblockfull.png');
    this.load.image('rightzigblock', 'Assets/rightzigblockfull.png');
    this.load.image('squareblock', 'Assets/squareblockfull.png');
    this.load.image('straightblock', 'Assets/straightblockfull.png');
    this.load.image('tblock', 'Assets/tblockfull.png');
    this.load.image('smalllblock', 'Assets/smalllblockfull.png');
    this.load.image('shortstraightblock', 'Assets/shortstraightfull.png');
    this.load.image('singleleftlblock', 'Assets/leftlblock.png');
    this.load.image('singleleftzigblock', 'Assets/leftzigblock.png');
    this.load.image('singlerightlblock', 'Assets/rightlblock.png');
    this.load.image('singlerightzigblock', 'Assets/rightzigblock.png');
    this.load.image('singlesquareblock', 'Assets/squareblock.png');
    this.load.image('singlestraightblock', 'Assets/straightblock.png');
    this.load.image('singletblock', 'Assets/tblock.png');
    this.load.image('scrolluparrow', 'Assets/Arrow.png')
    this.load.image('scrolldownarrow', 'Assets/downarrow.png')
}

create ()//the game engines create function, it runs static code that doesnt require updating
{   
    console.log("Create")//debugging comment to show current game step

    console.log(extended)
    if (!extended){//checks if the game is extended
        numberOfPieces = numberOfPiecesStandard;
    } else{
        numberOfPieces = numberOfPiecesExtended;
    }
    console.log(level)
    if (level==0){
        level = 3
    }

    if (sizeSelector == 0){
        gameSizeWidth = gameSize[1]
    }else{
        gameSizeWidth = gameSize[sizeSelector-1]
        }
    if (sizeSelector == 3){
        fieldCords[0] = 150;
    }
    pieceStartPoint = [(fieldCords[0] + (((gameSizeWidth)*blockSize)/2)), fieldCords[1]+(3*blockSize)]//makes the piece start in the middle top of the field

    let createGUI = () =>{ //function that builds the graphical interface, such as background, text and title images
        this.add.image(0, 0, 'bgimage').setOrigin(0,0); 
        this.add.rectangle(fieldCords[0], fieldCords[1]+(blockSize*2.5), gameSizeWidth*blockSize,gameSizeHeight*blockSize, 0x737373).setOrigin(0,0);
        var title = this.add.image(config.width/2, 70, 'title')
        title.setScale(0.75);
        var grouptext = this.add.image(config.width/2+125, 195, 'group')
        grouptext.setScale(0.4);
        this.add.rectangle(fieldCords[0]+gameSizeWidth*blockSize+25, fieldCords[1]+(blockSize*2.5), 350,gameSizeHeight*blockSize - 100, 0x737373).setOrigin(0,0);
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

    let initiatiseGameLines = () => {
        gameline1 = this.add.group();
        gameline2 = this.add.group();
        gameline3 = this.add.group();
        gameline4 = this.add.group();
        gameline5 = this.add.group();
        gameline6 = this.add.group();
        gameline7 = this.add.group();
        gameline8 = this.add.group();
        gameline9 = this.add.group();
        gameline10 = this.add.group();
        gameline11 = this.add.group();
        gameline12 = this.add.group();
        gameline13 = this.add.group();
        gameline14 = this.add.group();
        gameline15 = this.add.group();
        gameline16 = this.add.group();
        gameline17 = this.add.group();
        gameline18 = this.add.group();
        gameline19 = this.add.group();
        gameline20 = this.add.group();
        gameline21 = this.add.group();
        gameline22 = this.add.group();
        gameline23 = this.add.group();
        gameline24 = this.add.group();
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
        let quit =()=> {
            currentPosition = []
            fieldArray = []
            this.scene.start("StartupScene")
            pauseState = false
        }
        function cancel(){
            pauseMenuCont.setVisible(false)
            pauseState = false
        }
        var escBg = this.add.rectangle(config.width/2, config.height/2, config.width/3, config.height/3,  0x464646, 30)
        var quitText = this.add.text(config.width/2 - 75, config.height/2 - 100, 'Quit?', { fill: '#ffffff'});
        quitText.setFontSize(60)
        var quitButtonText = this.add.text(config.width/2 + 50, config.height/2+50, 'Yes', { fill: '#ffffff' });
        quitButtonText.setFontSize(60)
        quitButtonText.setInteractive({ useHandCursor: true });
        quitButtonText.on('pointerdown', () => quit());
        var cancelButtonText = this.add.text(config.width/2-125, config.height/2+50, 'No', { fill: '#ffffff' });
        cancelButtonText.setFontSize(60)
        cancelButtonText.setInteractive({ useHandCursor: true });
        cancelButtonText.on('pointerdown', () => cancel());
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
    initiatiseGameLines()
    createTetromino(currentPiece, pieceStartPoint[0], pieceStartPoint[1]);
    nextPieceImage = this.add.image(fieldCords[0]+gameSizeWidth*blockSize+225, fieldCords[1]+(blockSize*2.5+90), blockTextures[nextPiece])
    controls = this.input.keyboard.createCursorKeys();//variable to hold the array of available interaction keys
    console.log(fieldArray)//debug message to check the matrix has been correctly been drawn
    console.log(gameSpeeds[level - 1])
    timedEvent = this.time.addEvent({ delay: gameSpeeds[level - 1], callback: onEvent, callbackScope: this, loop : true});//the game timer
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
    leveltext.setText('Level: '+ levelName[level-1])
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
            }
            tetrominoVelocity.y += 32
            canMove = true
        }
    }
    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);//tells the physics engine the tetris piece will travel on 2 axis

    if (pieceSwap){//pause the timer and does all the processing needed inbetween pieces, note: make functions for each process, current problem = scope limitations
        this.tetromino.setActive(false)//these two lines deactivate the players and physics engines control over the current tetromino
        this.tetromino.setStatic(true)
        var lineCounter = 0
        var topLine = 0

        function shiftArrayLine(lineNumber){
            for (var i = 0; i < fieldArray[lineNumber].length; i++){
                fieldArray[lineNumber][i] = fieldArray[lineNumber - 1][i]
            }
        }

        function checkLine(lineNumber){
            var line = []
            for (var i = 2; i < gameSizeWidth-1; i++){ 
                line.push(fieldArray[lineNumber][i])
            }
                
            if(line.includes(0)){
                return false
            }else{
                return true
            }
            
        }

        function counter(lineNumber){
            if (lineCounter == 0){
                topLine = lineNumber
            }
            lineCounter += 1
        }

        for (var i = 0; i < blockPosition[currentPiece].length; i++){//saves the current position into the field array, making it an obstacle and part of the game field
            var iimage
            fieldArray[currentPosition[i][1]][currentPosition[i][0]] = 1;
            iimage = this.add.image((fieldCords[0] - blockSize) +(currentPosition[i][0]*blockSize), fieldCords[1]+(currentPosition[i][1]*blockSize), singleBlockTextures[currentPiece])
            //due to groups having to be initilised in seperate variables and there isnt a way to iterate through numbered variable, a lot of repeated, messy code is needed here

            if(currentPosition[i][1] == 1){
                gameline22.add(iimage)
                if (checkLine(1)){
                    gameline22.clear(true)

                    counter(1)
                }

            }else if(currentPosition[i][1] == 2){
                gameline21.add(iimage)
                if (checkLine(2)){
                    gameline21.clear(true)

                    counter(2)
                }

            }else if(currentPosition[i][1] == 3){
                gameline20.add(iimage)
                if (checkLine(3)){
                    gameline20.clear(true)

                    counter(3)
                }

            }else if(currentPosition[i][1] == 4){
                gameline19.add(iimage)
                if (checkLine(4)){
                    gameline19.clear(true)

                    counter(4)
                }
            }else if(currentPosition[i][1] == 5){
                gameline18.add(iimage)
                if (checkLine(5)){
                    gameline18.clear(true)

                    counter(5)
                }

            }else if(currentPosition[i][1] == 6){
                gameline17.add(iimage)
                if (checkLine(6)){
                    gameline17.clear(true)

                    counter(6)
                }

            }else if(currentPosition[i][1] == 7){
                gameline16.add(iimage)
                if (checkLine(7)){
                    gameline16.clear(true)
                    
                    counter(7)
                }

            }else if(currentPosition[i][1] == 8){
                gameline15.add(iimage)
                if (checkLine(8)){
                    gameline15.clear(true)
                    
                    counter(8)
                }

            }else if(currentPosition[i][1] == 9){
                gameline14.add(iimage)
                if (checkLine(9)){
                    gameline14.clear(true)
                    
                    counter(9)
                }

            }else if(currentPosition[i][1] == 10){
                gameline13.add(iimage)
                if (checkLine(10)){
                    gameline13.clear(true)
                    
                    counter(10)
                }

            }else if(currentPosition[i][1] == 11){
                gameline12.add(iimage)
                if (checkLine(11)){
                    gameline12.clear(true)
                    
                    counter(11)
                }

            }else if(currentPosition[i][1] == 12){
                gameline11.add(iimage)
                if (checkLine(12)){
                    gameline11.clear(true)
                   
                    counter(12)
                    }

            }else if(currentPosition[i][1] == 13){
                gameline10.add(iimage)
                if (checkLine(13)){
                    gameline10.clear(true)
                    
                    counter(13)
                }
            }else if(currentPosition[i][1] == 14){
                gameline9.add(iimage)
                if (checkLine(14)){
                    gameline9.clear(true)
                    
                    counter(14)
                }
            }else if(currentPosition[i][1] == 15){
                gameline8.add(iimage)
                if (checkLine(15)){
                    gameline8.clear(true)
                    
                    counter(15)
                }
            }else if(currentPosition[i][1] == 16){
                gameline7.add(iimage)
                if (checkLine(16)){
                    gameline7.clear(true)
                    
                    counter(16)
                }
            }else if(currentPosition[i][1] == 17){
                gameline6.add(iimage)
                if (checkLine(17)){
                    gameline6.clear(true)
                    
                    counter(17)
                }
            }else if(currentPosition[i][1] == 18){
                    gameline5.add(iimage)
                    if (checkLine(18)){
                        gameline5.clear(true)
                        
                        counter(18)
                    }
    
            }else if(currentPosition[i][1] == 19){
                    gameline4.add(iimage)
                    if (checkLine(19)){
                        gameline4.clear(true)
                       
                        counter(19)
                    }
            }else if(currentPosition[i][1] == 20){
                    gameline3.add(iimage)
                    if (checkLine(20)){
                        gameline3.clear(true)
                        
                        counter(20)
                    }
            }else if(currentPosition[i][1] == 21){
                    gameline2.add(iimage)
                    if (checkLine(21)){
                        gameline2.clear(true)
                        
                        counter(21)
                    }
            }else if(currentPosition[i][1] == 22){
                    gameline1.add(iimage)
                    
                    if (checkLine(22)){
                        gameline1.clear(true)
                        
                        counter(22)
                    }
            }else{
                console.log('block wasnt placed into group, something is wrong')
            }
            
        };


        if(lineCounter > 0){
            if (lineCounter == 4){
                currentGameScore += scoreValues[3]
            }else if (lineCounter == 3){
                currentGameScore += scoreValues[2]
            }else if (lineCounter == 2){
                currentGameScore += scoreValues[1]
            }else if (lineCounter == 1){
                currentGameScore += scoreValues[0]
            }else{
                console.log("lineCounter is out of range, this message shouldn't be seen")
            }
            if (topLine == 22){
                this.tweens.add({ targets: gameline2.getChildren(), y: '+=32', duration: 0});
                this.tweens.add({ targets: gameline3.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline4.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline5.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline6.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0}); 
                for(var i = 0; i < 22; i++){
                    shiftArrayLine(22-i)
                }
                    gameline1 = gameline2
                    gameline2 = gameline3
                    gameline3 = gameline4  
                    gameline4 = gameline5
                    gameline5 = gameline6
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22

            }else if (topLine == 21){
                this.tweens.add({ targets: gameline3.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline4.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline5.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline6.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 21; j++){
                        shiftArrayLine((21+(lineCounter-1))-j)
                    }
                    gameline2 = gameline3
                    gameline3 = gameline4  
                    gameline4 = gameline5
                    gameline5 = gameline6
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }

            }else if (topLine == 20){
                this.tweens.add({ targets: gameline4.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline5.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline6.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 20; j++){
                        shiftArrayLine((20+(lineCounter-1))-j)
                    }
                    gameline3 = gameline4  
                    gameline4 = gameline5
                    gameline5 = gameline6
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }

            }else if (topLine == 19){
                this.tweens.add({ targets: gameline5.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline6.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 19; j++){
                        shiftArrayLine((19+(lineCounter-1))-j)
                    }
                    gameline4 = gameline5
                    gameline5 = gameline6
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }

            }else if (topLine == 18){
                this.tweens.add({ targets: gameline6.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 18; j++){
                        shiftArrayLine((18+(lineCounter-1))-j)
                    }
                    gameline5 = gameline6
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
 
            }else if (topLine == 17){
                this.tweens.add({ targets: gameline7.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 17; j++){
                        shiftArrayLine((17+(lineCounter-1))-j)
                    }
                    gameline6 = gameline7
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 16){
                this.tweens.add({ targets: gameline8.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 16; j++){
                        shiftArrayLine((16+(lineCounter-1))-j)
                    }
                    gameline7 = gameline8
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
                    
            }else if (topLine == 15){
                this.tweens.add({ targets: gameline9.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 15; j++){
                        shiftArrayLine((15+(lineCounter-1))-j)
                    }
                    gameline8 = gameline9
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 14){
                this.tweens.add({ targets: gameline10.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 14; j++){
                        shiftArrayLine((14+(lineCounter-1))-j)
                    }
                    gameline9 = gameline10
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
                    
            }else if (topLine == 13){
                this.tweens.add({ targets: gameline11.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 13; j++){
                        shiftArrayLine((13+(lineCounter-1))-j)
                    }
                    gameline10 = gameline11
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 12){
                this.tweens.add({ targets: gameline12.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 12; j++){
                        shiftArrayLine((12+(lineCounter-1))-j)
                    }
                    gameline11 = gameline12
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 11){
                this.tweens.add({ targets: gameline13.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 11; j++){
                        shiftArrayLine((11+(lineCounter-1))-j)
                    }
                    gameline12 = gameline13
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 10){
                this.tweens.add({ targets: gameline14.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 10; j++){
                        shiftArrayLine((10+(lineCounter-1))-j)
                    }
                    gameline13 = gameline14
                    gameline14 = gameline15
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 9){
                this.tweens.add({ targets: gameline15.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 9; j++){
                        shiftArrayLine((9+(lineCounter-1))-j)
                    }
                    gameline15 = gameline16
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 8){
                this.tweens.add({ targets: gameline16.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 8; j++){
                        shiftArrayLine((8+(lineCounter-1))-j)
                    }
                    gameline16 = gameline17
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 7){
                this.tweens.add({ targets: gameline17.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 7; j++){
                        shiftArrayLine((7+(lineCounter-1))-j)
                    }
                    gameline17 = gameline18
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 6){
                this.tweens.add({ targets: gameline18.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 6; j++){
                        shiftArrayLine((6+(lineCounter-1))-j)
                    }
                    gameline18 = gameline19
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 5){
                this.tweens.add({ targets: gameline19.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 5; j++){
                        shiftArrayLine((5+(lineCounter-1))-j)
                    }
                    gameline19 = gameline20
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 4){
                this.tweens.add({ targets: gameline20.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1});
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 4; j++){
                        shiftArrayLine((4+(lineCounter-1))-j)
                    }
                    gameline20 = gameline21
                    gameline21 = gameline22
                }
            
            }else if (topLine == 3){
                this.tweens.add({ targets: gameline21.getChildren(), y: '+=32', duration: 0, loop: lineCounter -1}); 

                for (var i = 0; i < lineCounter; i++){
                    for(var j = 0; j < 4; j++){
                        shiftArrayLine((4+(lineCounter-1))-j)
                    }
                    gameline21 = gameline22
                }
            
            }else{
                console.log('topline is out of range')
            }
            linesCleared += lineCounter
            lineCounter = 0
            topLine = 0
            

        
        }
        
        this.tetromino.destroy();

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
            if (fieldArray[iterBlockPosY][iterBlockPosX] == 1){
                gameOver = true
            } 
            currentPosition.push([iterBlockPosX,iterBlockPosY]);
        }
        

        //replace the next piece display, Note: needs function
        nextPieceImage.destroy();
        currentPiece = nextPiece
        console.log(numberOfPieces)
        nextPiece = Math.floor(Math.random() * numberOfPieces);
        nextPieceImage = this.add.image(fieldCords[0]+gameSizeWidth*blockSize+225, fieldCords[1]+(blockSize*2.5+90), blockTextures[nextPiece])

        
        pieceSwap = false;//resumes timer


    }

    if (gameOver == true){
        pauseState = true

        this.add.rectangle(config.width/2, config.height/2, config.width/2, config.height/2,  0x464646, 30)
        var gameOverText = this.add.text(config.width/2 - 190, config.height/2 - 225, 'Game Over', { fill: '#ffffff'});
        gameOverText.setFontSize(70);
        var selNameText = this.add.text(config.width/2 - 125, config.height/2 - 125, 'Select your initials', { fill: '#ffffff'});
        selNameText.setFontSize(20);

        var first = 0
        var second = 0
        var third = 0
        var firstUpArrow = this.add.image(config.width/2 - 150, config.height/2 - 45, 'scrolluparrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        var secondUpArrow = this.add.image(config.width/2 , config.height/2 - 45, 'scrolluparrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        var thirdUpArrow = this.add.image(config.width/2 + 150, config.height/2 - 45, 'scrolluparrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        firstUpArrow.on('pointerdown', function (pointer) {
            first =first + 1
            nameArray[0] = alphabet[first]
        });
        secondUpArrow.on('pointerdown', function (pointer) {
            second += 1
            nameArray[1] = alphabet[second]
        });
        thirdUpArrow.on('pointerdown', function (pointer) {
            third += 1
            nameArray[2] = alphabet[third]
        });

        var firstLetter = this.add.text(config.width/2 - 175, config.height/2-15)
        var secondLetter = this.add.text(config.width/2 -25, config.height/2-15)
        var thirdLetter = this.add.text(config.width/2 + 125, config.height/2-15)
        firstLetter.setFontSize(70)
        secondLetter.setFontSize(70)
        thirdLetter.setFontSize(70)
        firstLetter.setText(nameArray[0])
        secondLetter.setText(nameArray[1])
        thirdLetter.setText(nameArray[2])

        var firstDownArrow = this.add.image(config.width/2 - 150, config.height/2 + 75, 'scrolldownarrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        var secondDownArrow = this.add.image(config.width/2 , config.height/2 + 75, 'scrolldownarrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        var thirdDownArrow = this.add.image(config.width/2 + 150, config.height/2 + 75, 'scrolldownarrow').setInteractive({ useHandCursor: true }).setScale(0.20)
        firstDownArrow.on('pointerdown', function (pointer) {
            first -= 1
            nameArray[0] = alphabet[first]
        });
        secondDownArrow.on('pointerdown', function (pointer) {
            second -= 1
            nameArray[1] = alphabet[second]
        });
        thirdDownArrow.on('pointerdown', function (pointer) {
            third -= 1
            nameArray[2] = alphabet[third]
        });

        var submitButton = this.add.text(config.width/2 - 125, config.height/2 + 140, 'Submit', { fill: '#ffffff'}).setInteractive({ useHandCursor: true })
        submitButton.setFontSize(70);

        submitButton.on('pointerdown', function (pointer) {
            currentPosition = [];
            fieldArray = [];
            linesCleared = 0
            this.scene.scene.start("StartupScene");
            console.log(nameArray.join(''))
            for (var i = 0; i < highScores.length;i++){
                if (highScores[i][1] < currentGameScore){
                    highScores[i][0] = nameArray.join('')
                    highScores[i][1] = currentGameScore
                    break;
                }
            }
        });

        /*var element = this.add.dom(config.width/2,config.height/2, 'display').createFromCache('scoreform')
        element.addListener('click');
        element.on('click', function (event){
          if (event.target.name === 'submitButton') {
                currentPlayer = this.getChildByName('nameField');
                if (currentPlayer.value !== ''){
                    this.removeListener('click');
                    currentPosition = [];
                    fieldArray = [];

                    this.scene.start("StartupScene");}
                }
            })*/
        
        
    }

    
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
        }
        tetrominoVelocity.y += 32
        canMove = true
    }
    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);//same as in update(), just reinitalisting to keep in scope
}
