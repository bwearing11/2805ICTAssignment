/**  
* This file is the main configation page, it creates the viewport, contains global variables
* and initalises the first scene to the player, in this case, the main menu. Global variables 
* must be stored here as the game engine does not allow variables to be called outside of
* functions within scene scripts
*/

/**
 * Sets up the game
 * @global
 */
 var config = {
    /**  
     * default renders in openGL if available, switches to Canvas if not 
     * @global
     * */
    type: Phaser.AUTO, 
    /** 
     * Game canvas size
     * @global
     * */
    width: 1100, 
    /**
     *   Game canvas size 
     *   @global
    */
    height: 960, 
    /**
     *   Current version of the game
     *   @global
    */
    GameVersion: 0.1, 
    /**
     *  centers the viewport in the browser
     *  @global
    */
    autoCenter: Phaser,
    /**
     *  creates the physics game engine
     *  @global
    */
    physics: {
        /** 
         *  the type of physics engine, one of the 2 phaser offers
         *  @global
         * */ 
        default: 'matter',
        /**  
         * stops pieces being affected by the game engines gravity system, as gravity is handled by a timer
        * @global
        */ 
        matter:{
            gravity:{y:0} 
        }
    },
    /**  
     * list of scenes the game contains
     * @global
     * */
    scene: [StartupScene, SettingsScene, TetrisScene, HighscoreScene]
};
    /**
     * controls the falling speed
     * @global
     * */
    var gameSpeeds = [1000, 2000, 4000];
    /**
     * stores gamemode state
     * @global
     * */
    var extended = false; 
    /**
     * stores the game over state
     * @global
     * */
    var gameOver = false; 
    /**
     * stores the ai game mode state
     * @global
     * */
    var aiMode = false;  
    /**
     * stores the pause state
     * @global
     * */
    var pauseState = false;  
    /**
     * checks if game is muted
     * @global
     * */
    var mutedSound = false;  
    
    /**
     * stores the gamefield size 
     * @global
     * */
    var gameSizeWidth = 10; 
    /**
     * - replace with two variables from settings menus
     * @global
     * */
    var gameSizeHeight = 20; 
    
    /**
     * pixel size of the blocks
     * @global
     * */
    var blockSize = 32; 
    /**
     * number of tetrominoes in standard game
     * @global
     * */
    var numberOfPiecesStandard = 7; 
    /**
     * number of tetrominoes in extended game
     * @global
     * */
    var numberOfPiecesExtended = 9; 
    /**
     * stores the index for next block
     * @global
     * */
    var nextBlock = 0;  
    /**
     * - Array that controls tetromino positions
     * @global
     * */
    var fieldArray = []; 
    
    /**
     * size and position of the field based on inputted gamefield size
     * @global
     * */
    var fieldCords = [(config.width/3)-((gameSizeWidth*blockSize)/2),(config.height/2)-((gameSizeWidth*blockSize))] 

    /**
     * keeps track of borders and fallen tetrominoes
     * @global
     * */
    var takenSpace = 1; 
    /**
     * initalisation variable for the score
     * @global
     * */
    var currentGameScore = 0; 
    /**
     * list of scores depending on lines filled
     * @global
     * */
    var scoreValues = [100,300,600,1000]; 
    /**
     * level of the game, can be changed in the settings menu
     * @global
     * */
    var level = 1; 
    /**
     * keeps track of lines cleared by player
     * @global
     * */
    var linesCleared = 0; 
    
    /**
     * makes the piece start in the middle top of the field
     * @global
     * */
    var pieceStartPoint = [(fieldCords[0] + (((gameSizeWidth)*blockSize)/2)), fieldCords[1]+(3*blockSize)]
    
    /**
     * keeps track of the current pieces position in the fieldArray variable
     * @global
     * */
    var currentPosition = [];
    /**
     * checks whether the block is impeded by an obstacle, preventing the player from inputting certain directions
     * @global
     * */
    var canMove = true;
    
    /**
     * checks default position
     * @global
     * */
    var r0 = true; 
    /**
     * checks first rotation position
     * @global
     * */
    var r90 = false; 
    /**
     * checks second rotation position
     * @global
     * */
    var r180 = false; 
    /**
     * check third rotation position
     * @global
     * */
    var r270 = false; 

     /**
     * Speed of the game
     * @global
     * */
    var gameSpeed = gameSpeeds[level - 1]
     /**
     * pauses the timer while the all the processes in creating a new piece are running.
     * @global
     * */

    var pieceSwap = false;

    /**
     * a list of variables that are required to be global but don't need values at game start 
     * @global
     * */
    var scoretext, leveltext, linetext, gametypetext, modetext, timedEvent, currentTetromino,nextPiece, controls, nextPieceImage, currentPiece; 
    
    /**
     * has the matrix positions of each block for each piece at their default position
     * @global
     * */
    var blockPosition = {  
        0 : [[0,0],[0,1],[-1,1],[0,-1]], // Left L
        1 : [[0,0],[0,1],[1,1],[0,-1]], // Right L
        2 : [[0,0],[0,-1],[0,1],[0,2]], // Straight
        3 : [[0,0],[0,-1],[1,-1],[1,0]], // Square
        4 : [[0,0],[-1,0],[0,-1],[1,-1]],// Right Zig
        5 : [[0,0],[-1,0],[0,-1],[1,0]], // T
        6 : [[0,0],[1,0],[0,-1],[-1,-1]], // Left zig
        7 : [[0,0],[0,-1],[1,0]], // small L
        8 : [[0,0],[0,-1],[0,1]] //small straight
    };
    
    /**
     * matrix positions after the first rotation
     * @global
     * */
    var rotation1 ={ 
        0 : [[0,0],[-1,0],[-1,-1],[1,0]],//Left L
        1 : [[0,0],[-1,0],[-1,1],[1,0]],//Right L
        2 : [[0,0],[1,0],[-2,0],[-1,0]],//Straight
        3 : [[0,0],[0,-1],[1,-1],[1,0]],//Square
        4 : [[0,-1],[0,0],[-1,-1],[-1,-2]],//Right Zig
        5 : [[0,0],[0,-1],[1,0],[0,1]],//T
        6 : [[0,0],[0,1],[1,0],[1,-1]]//Left zig
    
    
    };
    
    /**
     * matrix positions after the second rotation
     * @global
     * */
    var rotation2 = {
        0 : [[0,0],[0,-1],[1,-1],[0,1]],//Left L
        1 : [[0,0],[0,-1],[-1,-1],[0,1]],//Right L
        2 : [[0,0],[0,1],[0,-1],[0,-2]],//Straight
        3 : [[0,0],[0,-1],[1,-1],[1,0]],//Square
        4 : [[0,-1],[-1,-1],[0,-2],[1,-2]],//Right Zig
        5 : [[0,0],[1,0],[0,1],[-1,0]],//T
        6 : [[0,0],[-1,0],[0,1],[1,1]]//Left zig
    
    };
       
    /**
     * matrix positions after the third rotation
     * @global
     * */
    var rotation3 = {
        0 : [[0,0],[1,0],[1,1],[-1,0]],//Left L
        1 : [[0,0],[1,0],[1,-1],[-1,0]],//Right L
        2 : [[0,0],[1,0],[2,0],[-1,0]],//Straight
        3 : [[0,0],[0,1],[1,-1],[1,0]],//Square
        4 : [[0,-1],[0,-2],[1,-1],[1,0]],//Right Zig
        5 : [[0,0],[0,1],[-1,0],[0,-1]],//T
        6 : [[0,0],[0,-1],[-1,0],[-1,1]]//Left zig
    
    };
    
    /**
     * list of block textures, has the same index as the positional matrices for ease of use
     * @global
     * */
    var blockTextures = [ 
        'leftlblock', 'rightlblock', 'straightblock',
        'squareblock','rightzigblock', 'tblock',
        'leftzigblock', 'leftlblock', 'straightblock'
    ]
    
    /**
     * adjusts where the origin block of the tetromino is created to line up with the field
     * @global
     * */
    var blockOrigins = {
        0 : [0, 0],
        1 : [0, 0],
        2 : [0, 0],
        3 : [blockSize/2, -blockSize/2],
        4 : [0, -blockSize],
        5 : [0, 0],
        6 : [0, 0]   
    }

    if (!extended){//checks if the game is extended
        var numberOfPieces = numberOfPiecesStandard;
    } else{
        var numberOfPieces = numberOfPiecesExtended;
    }

    /**
     * feeds the config settings into the game scene
     * @global
     * */
let game = new Phaser.Game(config);
 game.scene.add(StartupScene);//adds the main menu to the scene
 game.scene.start('StartupScene');//intialises the main menu
