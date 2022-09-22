var config = {
    type: Phaser.AUTO, //default renders in openGL if available, switches to Canvas if not
    width: 1280, //Game canvas size
    height: 960,
    GameVersion: 0.1, //Current version of the game
    autoCenter: Phaser,
    physics: {
        default: 'matter',
        matter:{
            gravity:{y:0}
        }
    },
    scene: [StartupScene, SettingsScene, TetrisScene, HighscoreScene]
};

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


    
let game = new Phaser.Game(config);
 game.scene.add(SettingsScene);
 game.scene.start('SettingsScene');
