var config = {
    type: Phaser.AUTO, //default renders in openGL if available, switches to Canvas if not
    width: 1280, //Game canvas size
    height: 960,
    GameVersion: 0.1, //Current version of the game
    autoCenter: Phaser,
    physics: {
        default: 'matter',
        matter:{
            debug : true,
            gravity:{y:0}
            
        }
    },
    scene: {
        preload: preload, //runs the preload function
        create: create, //runs the create function
        update: update //runs the update function
    }
};

new Phaser.Game(config);

var gameSpeed = 1000;

var extended = false; //stores gamemode state
var gameOver = false; //stores the game over state
var aiMode = false; // stores the ai game mode state
var pauseState = false; // stores the pause state
var mutedSound = false; // checks if game is muted

var gameSizeWidth = 10; //stores the gamefield size - replace with variables from menus
var gameSizeHeight = 20;


var blockSize = 32; //pixel size of the blocks
var numberOfPiecesStandard = 7; //number of tetrominoes in standard game
var numberOfPiecesExtended = 9; //number of tetrominoes in extended game
var nextBlock = 0; // stores the index for next block
var fieldArray = [];

var fieldCords = [(config.width/3)-((gameSizeWidth*blockSize)/2),(config.height/2)-((gameSizeWidth*blockSize))]


var takenSpace = 1; //keeps track of borders and fallen tetrominoes
var currentGameScore = 0; //initalisation variable for the score
var scoreValues = [100,300,600,1000]; //list of scores depending on lines filled
var level = 1;
var linesCleared = 0;

var pieceStartPoint = [(fieldCords[0] + (((gameSizeWidth)*blockSize)/2)), fieldCords[1]+(3*blockSize)]

var currentPosition = [];
var canMove = true;

var r0 = true;
var r90 = false;
var r180 = false;
var r270 = false;
var scoretext, leveltext, linetext, gametypetext, modetext, timedEvent, currentTetromino,nextPiece, controls, currentPiece;

var blockPosition = { // has the matrix positions of each block for each piece
    0 : [[0,0],[0,-1],[-1,-1],[0,1]], // Left L
    1 : [[0,0],[0,-1],[1,-1],[0,1]], // Right L
    2 : [[0,0],[0,1],[0,2],[0,-1]], // Straight
    3 : [[0,0],[0,1],[1,1],[1,0]], // Square
    4 : [[0,0],[-1,0],[0,1],[1,1]],// Right Zig
    5 : [[0,0],[-1,0],[0,1],[1,0]], // T
    6 : [[0,0],[1,0],[0,1],[-1,1]], // Left zig
    7 : [[0,0],[0,1],[1,0]], // small L
    8 : [[0,0],[0,1],[0,-1]] //small straight
};

var rotation1 ={
    0 : [[0,0],[-1,0],[-1,1],[1,0]],
    1 : [[0,0],[-1,0],[-1,-1][1,0]],
    2 : [[0,0],[1,0],[2,0][-1,0]],
    3 : [[0,0],[0,1],[1,1],[1,0]],
    4 : [[0,0],[0,-1],[-1,0],[-1,1]],
    5 : [[0,0],[0.1],[1,0],[0,-1]],
    6 : [[0,0],[0,-1],[1,0],[1,1]]


}

var rotation2 = {
    0 : [[0,0],[0,1],[1,1],[0,-1]],
    1 : [[0,0],[0,1],[-1,1],[0,-1]],
    2 : [[0,0],[0,1],[0,2],[0,-1]],
    3 : [[0,0],[0,1],[1,1],[1,0]],
    4 : [[0,0],[-1,0],[0,1],[1,1]],
    5 : [[0,0],[1,0],[0,-1],[-1,0]],
    6 : [[0,0],[-1,0],[0,-1],[1,-1]]

}
    
var rotation3 = {
    0 : [[0,0],[1,0],[1,-1],[-1,0]],
    1 : [[0,0],[1,0],[1,1],[-1,0]],
    2 : [[0,0],[1,0],[2,0][-1,0]],
    3 : [[0,0],[0,1],[1,1],[1,0]],
    4 : [[0,0],[0,1],[1,0],[1,-1]],
    5 : [[0,0],[0,-1],[-1,0],[0,1]],
    6 : [[0,0],[0,1],[-1,0],[-1,-1]]

}

var blockTextures = [ //list of textures with the same index as the above array
    'leftlblock', 'rightlblock', 'straightblock',
    'squareblock','rightzigblock', 'tblock',
    'leftzigblock', 'leftlblock', 'straightblock'
]

var blockOrigins = {
    0 : [0, 0],
    1 : [0, blockSize],
    2 : [0, blockSize/2],
    3 : [blockSize/2, blockSize/2],
    4 : [0, 0],
    5 : [0, blockSize],
    6 : [0, blockSize]   
}

function preload () // preloads all the assets at games initialisation
{
    console.log("Preload")
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
}

function create ()
{
    console.log("Create")
    let createGUI = () =>{
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
    
    let createFieldArray = () => {
        for(var i = 0; i < gameSizeHeight + 4; i++){
            var col = [];
            for(var j = 0; j < gameSizeWidth + 2; j++) {
                col.push(0);
            }
            fieldArray.push(col);
        }
    }

    let createGamefield = (x, y) => {
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

    let createTetromino = (piece, x, y) => {//Creates the tetromino gameobject(Used arrow function to keep in scope of the game)
        //var originx = blockPosition[piece][0][0]; //saves origin postion which is used as the rotation centre point
        //var originy = blockPosition[piece][0][1];
        //for (var i = 0; i < blockPosition[piece].length; i++){ //creates sprites for each block of the tetromino
            //this.blocks = new Phaser.Physics.Matter.Sprite(this.matter.world, x + (blockPosition[piece][i][0]*blockSize), y - (blockPosition[piece][i][1]*blockSize), blockTextures[piece]);
            //var cobject = this.add.sprite(x + (blockPosition[piece][i][0]*blockSize), y - (blockPosition[piece][i][1]*blockSize), blockTextures[piece]).setInteractive

        //} 
        this.tetromino = new Phaser.Physics.Matter.Sprite(this.matter.world, (x + blockOrigins[piece][0]), (y + blockOrigins[piece][1]), blockTextures[piece]);
        this.add.existing(this.tetromino);
        for (var i = 0; i < blockPosition[piece].length; i++){
            var iterBlockPosX = blockPosition[piece][i][0] + Math.floor((gameSizeWidth+2)/2);
            var iterBlockPosY = blockPosition[piece][i][1]+3;
            currentPosition.push([iterBlockPosX,iterBlockPosY]);
        }
        console.log(currentPosition)

        return currentPosition
    }

    let pauseMenu = () => {
        var escBg = this.add.rectangle(config.width/2, config.height/2, config.width/3, config.height/3,  0x464646, 30)
        var quitText = this.add.text(config.width/2 - 75, config.height/2 - 100, 'Quit?', { fill: '#ffffff'});
        quitText.setScale(4)
        var quitButtonText = this.add.text(config.width/2 + 50, config.height/2+50, 'Yes', { fill: '#ffffff' });
        quitButtonText.setScale(3)
        quitButtonText.setInteractive();
        quitButtonText.on('pointerdown', () => console.log('quit button clicked'));
        var cancelButtonText = this.add.text(config.width/2-125, config.height/2+50, 'No', { fill: '#ffffff' });
        cancelButtonText.setScale(3)
        cancelButtonText.setInteractive();
        cancelButtonText.on('pointerdown', () => pauseMenuCont.setVisible(false), pauseState = false);
        var pauseMenuCont = this.add.container(0,0, [escBg,quitText,quitButtonText,cancelButtonText])
        pauseMenuCont.setVisible(false);

        return pauseMenuCont
    }
    
    if (!extended){
        var numberOfPieces = numberOfPiecesStandard;
    } else{
        var numberOfPieces = numberOfPiecesExtended;
    }

    currentPiece = Math.floor(Math.random() * numberOfPieces);
    nextPiece = Math.floor(Math.random() * numberOfPieces);

    createGUI()
    createFieldArray()
    createGamefield(fieldCords[0], fieldCords[1])
    
    createTetromino(currentPiece, pieceStartPoint[0], pieceStartPoint[1]);
    this.add.image(fieldCords[0]+gameSizeWidth*blockSize+225, fieldCords[1]+(blockSize*2.5+90), blockTextures[nextPiece])
    controls = this.input.keyboard.createCursorKeys();
    console.log(fieldArray)
    timedEvent = this.time.addEvent({ delay: gameSpeed, callback: onEvent, callbackScope: this, loop : true});
    var pauseMenuCont = pauseMenu()

    this.input.keyboard.on('keydown-ESC', function (event) {
        if (!pauseState){
            pauseState = true;
            pauseMenuCont.setVisible(true);
            
        }else if(pauseState){
            pauseState = false;
            pauseMenuCont.setVisible(false);
        }
    
    });
}



function update ()
{
    var tetrominoVelocity = new Phaser.Math.Vector2();
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

    if (this.input.keyboard.checkDown(controls.left, 250))
    {
  
        for (var i = 0; i < currentPosition.length; i++){
            var nextPosX = fieldArray[(currentPosition[i][1])][(currentPosition[i][0])-2];

            if (nextPosX == 1){
                console.log("im not supposed to move now")
                canMove = false;
                break
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){
            
            for (var i = 0; i < currentPosition.length; i++){
                currentPosition[i][0] -= 1;
            }
            tetrominoVelocity.x -= 32
        }
    }
        
        
    else if (this.input.keyboard.checkDown(controls.right, 250))
    {
        for (var i = 0; i < currentPosition.length; i++){
            var nextPosX = fieldArray[(currentPosition[i][1])][(currentPosition[i][0])+2];

            if (nextPosX == 1){
                console.log("im not supposed to move now")
                canMove = false;
                break
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){
            for (var i = 0; i < currentPosition.length; i++){
                currentPosition[i][0] += 1;   
            }
            tetrominoVelocity.x += 32
        }

    }

    //if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC))
   // {
    //    pauseState = true;


   // }


    if (this.input.keyboard.checkDown(controls.up, 150))
   {/*
        if(r0){
            for (var i = 0; i < currentPosition.length; i++){
                var checkCurrentXPos = (currentPosition[i][0]-blockPosition[currentPiece][i][0]) + rotation1[currentPiece][i][0]
                for (var j = 0; j< currentPosition.length; i++){
                    var checkCurrentYPos = (currentPosition[0][j] - blockPosition[currentPiece][0][j]) + rotation1[currentPiece][0][j]
                }
            }
                var checkCurrentPos = [checkCurrentXPos,checkCurrentYPos]
                var nextPosX = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];
                var nextPosY = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];

            if (nextPosX == 1|| nextPosY == 1){
                canMove = false;
            }else{
                canMove = true;
                currentPosition = checkCurrentPos
            }
        }

        if(r90){
            for (var i = 0; i < currentPosition.length; i++){
                var checkCurrentXPos = currentPosition[i][0] - checkCurrentPos[1] + rotation2[currentPiecee][i][0]
                for (var j = 0; j< currentPosition.length; i++){
                    var checkCurrentYPos = currentPosition[0][j] + rotation2[currentPiece][0][j]
                }
            }
                var checkCurrentPos = [checkCurrentXPos,checkCurrentYPos]
                var nextPosX = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];
                var nextPosY = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];

            if (nextPosX == 1|| nextPosY == 1){
                canMove = false;
            }else{
                canMove = true;
                currentPosition = checkCurrentPos
            }
        }

        if(r180){
            for (var i = 0; i < currentPosition.length; i++){
                var checkCurrentXPos = currentPosition[i][0] + rotation3[currentPiece][i][0]
                for (var j = 0; j< currentPosition.length; i++){
                    var checkCurrentYPos = currentPosition[0][j] + rotation3[currentPiece][0][j]
                }
            }
                var checkCurrentPos = [checkCurrentXPos,checkCurrentYPos]
                var nextPosX = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];
                var nextPosY = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];

            if (nextPosX == 1|| nextPosY == 1){
                canMove = false;
            }else{
                canMove = true;
                currentPosition = checkCurrentPos
            }

        if(r270){
                for (var i = 0; i < currentPosition.length; i++){
                    var checkCurrentXPos = currentPosition[i][0] + blockPosition[currentPiece][i][0]
                    for (var j = 0; j< currentPosition.length; i++){
                        var checkCurrentYPos = currentPosition[0][j] + blockPosition[currentPiece][0][j]
                    }
                }
                    var checkCurrentPos = [checkCurrentXPos,checkCurrentYPos]
                    var nextPosX = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];
                    var nextPosY = fieldArray[(checkCurrentPos[i][1])+1][(checkCurrentPos[i][0])];
    
                if (nextPosX == 1|| nextPosY == 1){
                    canMove = false;
                }else{
                    canMove = true;
                    currentPosition = checkCurrentPos
                }
            }
            */
        if (canMove && !pauseState){

            this.tetromino.angle += 90;
            
            }

        }else if (this.input.keyboard.checkDown(controls.down, 150))
    {
        for (var i = 0; i < currentPosition.length; i++){
            var nextPosY = fieldArray[(currentPosition[i][1])+1][(currentPosition[i][0])];

            if (nextPosY == 1){
                console.log("im not supposed to move now")

                canMove = false;
                break
            }else{
                canMove = true;
            }
        }

        if (canMove && !pauseState){
            for (var i = 0; i < currentPosition.length; i++){
                currentPosition[i][1] += 1;   
            }
            tetrominoVelocity.y += 32
        }
    }


    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);

}

function onEvent()
{
    var tetrominoVelocity = new Phaser.Math.Vector2();
    for (var i = 0; i < currentPosition.length; i++){
        var nextPosX = fieldArray[(currentPosition[i][1])+1][(currentPosition[i][0])];

        if (nextPosX == 1  && !pauseState){
            canMove = false;
            break
        }else{
            canMove = true;
        }
    }

    if (canMove && !pauseState){
        this.time.addEvent(timedEvent);
        for (var i = 0; i < currentPosition.length; i++){
            currentPosition[i][1] += 1;   
        }
        tetrominoVelocity.y += 32
    }
    this.tetromino.setVelocity(tetrominoVelocity.x, tetrominoVelocity.y);
}

