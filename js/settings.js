//Opens the settings panel
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

function openSettings(){
    
}

/*Config page needs: 
    Size of field
    Game level
    Normal or extended game
    Player or AI game mode
*/

function preload(){
    this.load.image('ComicSettings', 'Assets/ComicSettings.png');
}

function create(){
    this.add.image(0, 0, 'ComicSettings').setOrigin(0,0);
}

function update ()
{
}

function buttonX(){

}