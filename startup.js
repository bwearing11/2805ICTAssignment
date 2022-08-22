//Opens the startup panel
var config = {
    type: Phaser.AUTO, //default renders in openGL if available, switches to Canvas if not
    width: 1280, //Game canvas size
    height: 960,
    GameVersion: 0.1, //Current version of the game
    autoCenter: Phaser,
    scene: {
        preload: preload, //runs the preload function
        create: create, //runs the create function
        update: update //runs the update function
    }
};

var game = new Phaser.Game(config);

function preload(){
    this.load.image('bgimage', 'Assets/bgimage3.png');
    this.load.image('logo_image', 'Assets/title3.png');
    this.load.image('student', 'Assets/students.png');
    this.load.image('button', 'Assets/button.png');
}

function create(){
    this.add.image(0, 0, 'bgimage').setOrigin(0,0);
    this.add.image(480, 63, 'logo_image').setOrigin(0,0);
    this.add.image(30, 30, 'student').setOrigin(0,0);
    this.add.image(256, 447, 'button').setOrigin(0,0);
    this.add.image(480, 447, 'button').setOrigin(0,0);
    this.add.image(704, 447, 'button').setOrigin(0,0);
    this.add.image(926, 447, 'button').setOrigin(0,0);
}

function update (){
    //this.add.image(0, 0, 'logo_image').setOrigin(10,50);
    //changeScreen(3);
}

function buttonX(){

}