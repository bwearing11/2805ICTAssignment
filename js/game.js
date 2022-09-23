/* 
This file is the main configation page, it creates the viewport, contains global variables
and initalises the first scene to the player, in this case, the main menu. Global variables 
must be stored here as the game engine does not allow variables to be called outside of
functions within scene scripts
*/

var config = {
    type: Phaser.AUTO, //default renders in openGL if available, switches to Canvas if not
    width: 1100, //Game canvas size
    height: 960,
    GameVersion: 0.1, //Current version of the game
    autoCenter: Phaser,//centers the viewport in the browser
    physics: {//creates the physics game engine
        default: 'matter',//the type of physics engine, one of the 2 phaser offers
        matter:{
            gravity:{y:0}//stops pieces being affected by the game engines gravity system, as gravity is handled by a timer
        }
    },
    scene: [StartupScene, SettingsScene, TetrisScene, HighscoreScene]//list of scenes the game contains
};

    var gameSpeed = 1000;//controls the falling speed

    var extended = false; //stores gamemode state
    var gameOver = false; //stores the game over state
    var aiMode = false; // stores the ai game mode state
    var pauseState = false; // stores the pause state
    var mutedSound = false; // checks if game is muted
    
    var gameSizeWidth = 10; //stores the gamefield size 
    var gameSizeHeight = 20;// - replace with two variables from settings menus
    
    
    var blockSize = 32; //pixel size of the blocks
    var numberOfPiecesStandard = 7; //number of tetrominoes in standard game
    var numberOfPiecesExtended = 9; //number of tetrominoes in extended game
    var nextBlock = 0; // stores the index for next block
    var fieldArray = []; //Array that controls tetromino positions
    
    var fieldCords = [(config.width/3)-((gameSizeWidth*blockSize)/2),(config.height/2)-((gameSizeWidth*blockSize))] //size and position of the field based on inputted gamefield size

    var takenSpace = 1; //keeps track of borders and fallen tetrominoes
    var currentGameScore = 0; //initalisation variable for the score
    var scoreValues = [100,300,600,1000]; //list of scores depending on lines filled
    var level = 1; // level of the game, can be changed in the settings menu
    var linesCleared = 0; // keeps track of lines cleared by player
    
    var pieceStartPoint = [(fieldCords[0] + (((gameSizeWidth)*blockSize)/2)), fieldCords[1]+(3*blockSize)]//makes the piece start in the middle top of the field
    
    var currentPosition = [];//keeps track of the current pieces position in the fieldArray variable
    var canMove = true;//checks whether the block is impeded by an obstacle, preventing the player from inputting certain directions
    
    var r0 = true; //checks default position
    var r90 = false; //checks first rotation position
    var r180 = false; //checks second rotation position
    var r270 = false; //check third rotation position

    var pieceSwap = false;//pauses the timer while the all the processes in creating a new piece are running.

    var scoretext, leveltext, linetext, gametypetext, modetext, timedEvent, currentTetromino,nextPiece, controls, nextPieceImage, currentPiece; // a list of variables that are required to be global but don't need values at game start 
    
    var blockPosition = { // has the matrix positions of each block for each piece at their default position
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
    
    var rotation1 ={ //matrix positions after the first rotation
        0 : [[0,0],[-1,0],[-1,1],[1,0]],//Left L
        1 : [[0,0],[-1,0],[-1,-1],[1,0]],//Right L
        2 : [[0,0],[1,0],[2,0],[-1,0]],//Straight
        3 : [[0,0],[0,1],[1,1],[1,0]],//Square
        4 : [[0,0],[0,-1],[-1,0],[-1,1]],//Right Zig
        5 : [[0,0],[0,1],[1,0],[0,-1]],//T
        6 : [[0,0],[0,-1],[1,0],[1,1]]//Left zig
    
    
    };
    
    var rotation2 = {//matrix positions after the second rotation
        0 : [[0,0],[0,1],[1,1],[0,-1]],//Left L
        1 : [[0,0],[0,1],[-1,1],[0,-1]],//Right L
        2 : [[0,0],[0,1],[0,2],[0,-1]],//Straight
        3 : [[0,0],[0,1],[1,1],[1,0]],//Square
        4 : [[0,0],[-1,0],[0,1],[1,1]],//Right Zig
        5 : [[0,0],[1,0],[0,-1],[-1,0]],//T
        6 : [[0,0],[-1,0],[0,-1],[1,-1]]//Left zig
    
    };
        
    var rotation3 = {//matrix positions after the third rotation
        0 : [[0,0],[1,0],[1,-1],[-1,0]],//Left L
        1 : [[0,0],[1,0],[1,1],[-1,0]],//Right L
        2 : [[0,0],[1,0],[2,0],[-1,0]],//Straight
        3 : [[0,0],[0,1],[1,1],[1,0]],//Square
        4 : [[0,0],[0,1],[1,0],[1,-1]],//Right Zig
        5 : [[0,0],[0,-1],[-1,0],[0,1]],//T
        6 : [[0,0],[0,1],[-1,0],[-1,-1]]//Left zig
    
    };
    
    var blockTextures = [ //list of block textures, has the same index as the positional matrices for ease of use
        'leftlblock', 'rightlblock', 'straightblock',
        'squareblock','rightzigblock', 'tblock',
        'leftzigblock', 'leftlblock', 'straightblock'
    ]
    
    var blockOrigins = {//adjusts where the origin block of the tetromino is created to line up with the field
        0 : [0, 0],
        1 : [0, 0],
        2 : [0, 0],
        3 : [blockSize/2, blockSize/2],
        4 : [0, 0],
        5 : [0, blockSize],
        6 : [0, blockSize]   
    }

    if (!extended){//checks if the game is extended
        var numberOfPieces = numberOfPiecesStandard;
    } else{
        var numberOfPieces = numberOfPiecesExtended;
    }

let game = new Phaser.Game(config);//feeds the config settings into the game scene
 game.scene.add(StartupScene);//adds the main menu to the scene
 game.scene.start('StartupScene');//intialises the main menu
