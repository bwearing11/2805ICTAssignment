class SettingsScene extends Phaser.Scene{
    constructor(){
        super("SettingsScene");
    }
    
    preload(){
        this.load.image('bgImage', 'Assets/bgimage.png');
        this.load.image('settingsLogo', 'Assets/settingsbutton.png');
        this.load.image('sizeOfField', 'Assets/sizeOfFieldWhite.png');
        this.load.image('gameLevel', 'Assets/gameLevelWhite.png');
        this.load.image('extendedGame', 'Assets/extendedGameWhite.png');
        this.load.image('aiGameMode', 'Assets/aiGameModeWhite.png');
        this.load.image('button', 'Assets/button.png');
        this.load.image('closeButton', 'Assets/backbutton.png');
        this.load.image('checkbox1', 'Assets/checkbox1.png');
        this.load.image('checkbox2', 'Assets/checkbox2.png');
        this.load.image('onbutton', 'Assets/onbutton.png');
        this.load.image('offbutton', 'Assets/offbutton.png');
        this.load.image('easy', 'Assets/easy.png');
        this.load.image('med', 'Assets/med.png');
        this.load.image('hard', 'Assets/hard.png');
        this.load.image('small', 'Assets/small.png');
        this.load.image('large', 'Assets/large.png');
        this.load.image('cross', 'Assets/bluecross.png');
        this.load.image('aiModeText', 'Assets/AIModeText.png');
        this.load.image('extendedGameText', 'Assets/extendedGameText.png');
        console.log("GO!")
    }


    create(){

        //Background image
        let bgImage = this.add.image(0, 0, 'bgImage').setOrigin(0,0);
        //Settings Logo
        let settingsLogo = this.add.image(config.width/2, 150, 'settingsLogo')
        //Close button
        this.add.image(config.width/8, 150, 'closeButton')
        .setScale(0.25)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("StartupScene"));

        //Names of each setting
        let fieldSize = this.add.image(0, 102, 'sizeOfField').setOrigin(0,0);
        let gameLevel = this.add.image(0, 230, 'gameLevel').setOrigin(0,0);
        let extendedGame = this.add.image(-5, 366, 'extendedGameText').setOrigin(0,0);
        let aiGameMode = this.add.image(-15, 484, 'aiModeText').setOrigin(0,0);
        
        //Game Size checkboxes
        let smallButton = this.add.image(510, 257, 'small').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameSizeRadio(1));
        let medButton = this.add.image(750, 257, 'med').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameSizeRadio(2));
        let largeButton = this.add.image(960, 257, 'large').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameSizeRadio(3));

        //Game Size Checkmarks
        let smallButtonCheck = this.add.image(548,332, 'cross');
        smallButtonCheck.setVisible(false);        //Sets default invisible
        let medButtonCheck = this.add.image(787,332, 'cross');
        let largeButtonCheck = this.add.image(997,332, 'cross');
        largeButtonCheck.setVisible(false);        //Sets default invisible

        //Game Level checkboxes
        let levelbuttons = this.add.image(510, 387, 'easy').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameLevelRadio(1));
        let medButton1 = this.add.image(750, 387, 'med').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameLevelRadio(2));
        let hardButton = this.add.image(960, 387, 'hard').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameLevelRadio(3));

        //Game Level Checkmarks
        let easyLevelCheck = this.add.image(548, 462, 'cross');
        easyLevelCheck.setVisible(true);        //Sets default invisible
        let medLevelCheck = this.add.image(787, 462, 'cross');
        medLevelCheck.setVisible(false); 
        let hardLevelCheck = this.add.image(997, 462, 'cross');
        hardLevelCheck.setVisible(false);        //Sets default invisible

        //Game Mode checkboxes
        let gmOnButton = this.add.image(750, 512, 'onbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameModeRadio(1));
        let gmOffButton = this.add.image(960, 513, 'offbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => GameModeRadio(2));

        //Game Mode Checkmarks
        let gmOnButtonCheck = this.add.image(787, 585, 'cross');
        gmOnButtonCheck.setVisible(extended);        //Sets default invisible
        let gmOffButtonCheck = this.add.image(997, 586, 'cross');
        gmOffButtonCheck.setVisible(!extended);        //Sets default invisible

        //AI Mode checkboxes
        let AIOnButton = this.add.image(750, 645, 'onbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => AIModeRadio(1));
        let AIOffButton = this.add.image(960, 646, 'offbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => AIModeRadio(2));

        //AI Mode Checkmarks
        let AIOnButtonCheck = this.add.image(787, 720, 'cross');
        AIOnButtonCheck.setVisible(aiMode);        //Sets default to aiMode global
        let AIOffButtonCheck = this.add.image(997, 720, 'cross');
        AIOffButtonCheck.setVisible(!aiMode);        //Sets default to opposite of aiMode global

        window.scene = this;
        
        //Function to allow the game size buttons as radio buttons
        function GameSizeRadio(state){
            if(state == 1){
                smallButtonCheck.setVisible(true);
                medButtonCheck.setVisible(false);
                largeButtonCheck.setVisible(false);
                sizeSelector = 1
            }else if (state == 2){
                smallButtonCheck.setVisible(false);
                medButtonCheck.setVisible(true);
                largeButtonCheck.setVisible(false);
                sizeSelector = 2
            }else if(state == 3){
                smallButtonCheck.setVisible(false);
                medButtonCheck.setVisible(false);
                largeButtonCheck.setVisible(true);
                sizeSelector = 3
            }
        }

        //Function to allow the game level buttons as radio buttons
        function GameLevelRadio(state){
            if(state == 1){
                easyLevelCheck.setVisible(true);
                medLevelCheck.setVisible(false);
                hardLevelCheck.setVisible(false);
                level = 1;
                console.log(level)
            }else if (state == 2){
                easyLevelCheck.setVisible(false);
                medLevelCheck.setVisible(true);
                hardLevelCheck.setVisible(false);
                level = 2;
                console.log(level)
            }else if(state == 3){
                easyLevelCheck.setVisible(false);
                medLevelCheck.setVisible(false);
                hardLevelCheck.setVisible(true);
                level = 3;
                console.log(level)
            }
        }

        //Function to allow the game mode buttons as radio buttons
        function GameModeRadio(state){
            if(state == 1){
                gmOnButtonCheck.setVisible(true);
                gmOffButtonCheck.setVisible(false);
                extended = true;
                console.log(extended)
            }else if (state == 2){
                gmOnButtonCheck.setVisible(false);
                gmOffButtonCheck.setVisible(true);
                extended = false;
                console.log(extended)
                
            }
        }

        //Function to allow the AI mode buttons as radio buttons
        function AIModeRadio(state){
            if(state == 1){
                AIOnButtonCheck.setVisible(true);
                AIOffButtonCheck.setVisible(false);
                aiMode= true;
                console.log(aiMode)
            }else if (state == 2){
                AIOnButtonCheck.setVisible(false);
                AIOffButtonCheck.setVisible(true);
                aiMode = false;
                console.log(aiMode)
                
            }
        }
    }

    
    
    update(){
        
    }



}