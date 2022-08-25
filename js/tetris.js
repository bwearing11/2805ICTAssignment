class TetrisScene extends Phaser.Scene{

    constructor(){
        super("TetrisScene");
    }

//var gameTick = Phaser.Timer.SECOND;
     gameSpeed = 1;

 extended = false; //stores gamemode state
 gameOver = false; //stores the game over state
 aiMode = false; // stores the ai game mode state
 pauseState = false; // stores the pause state
 mutedSound = false; // checks if game is muted

 gameSizeWidth = 10; //stores the gamefield size - replace with variables
 gameSizeHeight = 20;

 blockSize = 32; //pixel size of the blocks
 numberOfPiecesStandard = 7; //number of tetrominoes in standard game
 numberOfPiecesExtended = 9; //number of tetrominoes in extended game
 nextBlock = 0; // stores the index for next block

 takenSpace = 1; //keeps track of borders and fallen tetrominoes
 currentGameScore = 0; //initalisation variable for the score
 scoreValues = [100,300,600,1000]; //list of scores depending on lines filled

 blockPosition = {
    0 : [[0,-1],[0,0],[0,1],[1,1], 4], // Left L
    1 : [[0,-1],[0,0],[0,1],[-1,1], 4], // Right L
    2 : [[-1,0],[0,0],[1,0],[2,0], 4], // Straight
    3 : [[-1,-1],[0,-1],[0,0],[-1,0], 4], // Square
    4 : [[-1,0],[0,0],[0,-1],[1,-1], 4],// Right Zig
    5 : [[-1,0],[0,0],[1,0],[0,1], 4], // T
    6 : [[-1,-1],[0,-1],[0,0],[1,0], 4], // Left zig
    7 : [[0,-1],[0,0],[0,1], 3], // small L
    8 : [[-1,0],[0,0],[1,0], 3] //small straight
};

 preload () // preloads all the assets at games initialisation
{
    this.load.image('bgimage', 'Assets/bgimage1.png');
    this.load.image('borderblock', 'Assets/borderblock.png');
    this.load.image('leftlblock', 'Assets/leftlblock.png');
    this.load.image('leftzigblock', 'Assets/leftzigblock.png');
    this.load.image('rightlblock', 'Assets/rightlblock.png');
    this.load.image('rightzigblock', 'Assets/rightzigblock.png');
    this.load.image('squareblock', 'Assets/squareblock.png');
    this.load.image('straightblock', 'Assets/straightblock.png');
    this.load.image('tblock', 'Assets/tblock.png');
}

 create ()
{
    
    this.add.image(0, 0, 'bgimage').setOrigin(0,0);

    var fieldArray = [];
    var fieldSprites = []; 
    for(var i = 0; i < gameSizeHeight + 2; i++){
        var col = [];
        var spriteCol = [];
        for(var j = 0; j < gameSizeHeight + 2; j++) {
            col.push(0);
            spriteCol.push(null);
        }
        fieldArray.push(col);
        fieldSprites.push(spriteCol);
    }
    console.log(fieldArray)
    console.log(fieldSprites)
    for (var i = 0; i < fieldArray.length; i++){
        fieldArray[i,0] = 1
        

    }
}

 update ()
{
    
}
}