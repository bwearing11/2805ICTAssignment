
class StartupScene extends Phaser.Scene{

    constructor(){
        super("StartupScene");
    }

 preload(){
    //this.load.image('bgimage', 'Assets/bgimage3.png');
    //this.load.image('logo_image', 'Assets/title3.png');
    this.load.image('bgimage', 'Assets/bgimage.png');
    this.load.image('logo_image', 'Assets/title.png');
    this.load.image('student', 'Assets/students.png');
    this.load.image('button', 'Assets/button.png');
    this.load.image('playbutton', 'Assets/playbutton.png')
    this.load.image('hsbutton', 'Assets/hsbutton.png')
    this.load.image('settingsbutton', 'Assets/settingsbutton.png')
    this.load.image('quitbutton', 'Assets/quitbutton.png')
}
     

 create(){

    this.add.image(0, 0, 'bgimage').setOrigin(0,0);
    //this.add.image(480, 63, 'logo_image').setOrigin(0,0);
    this.add.image(config.width/2, 200, 'logo_image');
    this.add.image(30, 30, 'student').setOrigin(0,0);

    //this.add.image(256, 447, 'button').setOrigin(0,0).setInteractive()
    //.setOrigin(0,0)
    //.setInteractive()
    this.add.image(config.width/2, 400, 'playbutton').setInteractive({ useHandCursor: true }).setScale(0.40).on('pointerdown', () => this.scene.start("TetrisScene"));
    //var playText = this.add.text(260, 455, "Play", { fill: '#000000' })
    //playText.setFontSize(45)
    //this.add.image(480, 447, 'button').setOrigin(0,0).setInteractive()
    //.setOrigin(0,0)
    //.setInteractive()
    //.on('pointerdown', () => this.scene.start("HighscoreScene"));
    this.add.image(config.width/2, 560, 'hsbutton').setInteractive({ useHandCursor: true }).setScale(0.60).on('pointerdown', () => this.scene.start("HighscoreScene")); 
    //var hSText = this.add.text(480, 465, "Highscore", { fill: '#000000' })
    //hSText.setFontSize(23)
    //this.add.image(704, 447, 'button').setOrigin(0,0).setInteractive()
    //.setOrigin(0,0)
    //.setInteractive()
    //.on('pointerdown', () => this.scene.start("SettingsScene"));
    this.add.image(config.width/2, 725, 'settingsbutton').setInteractive({ useHandCursor: true }).setScale(0.45).on('pointerdown', () => this.scene.start("SettingsScene"));

    this.add.image(config.width/2, 850, 'quitbutton').setInteractive({ useHandCursor: true }).setScale(0.45).on('pointerdown', () => window.close());

        
}

 update (){

}

}
