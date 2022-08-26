class Example extends Phaser.Scene {
  constructor ()
  {
    super('HigscoreScene');
  }
  preload (){
        this.load.setBaseURL('https://labs.phaser.io')
        this.load.image('bgimage', 'assets/skies/bigsky.png');
      }

  create () {   
        
    const sky = this.add.image(0, 0, 'bgimage');
    const heading = this.add.text(160, 80, 'Top Score', {font: '40px Bold', fill: '#000000' })
      .setPadding(10)
      .setStyle({ backgroundColor: '#D1D0CE' });

    const rankH = this.add.text(150, 160, 'Rank', { font: '20px', fill: '#000000' });
    const nameH = this.add.text(225, 160, 'Name ', { font: '20px', fill: '#000000' });
    const scoreH  = this.add.text(300, 160, 'Score ', { font: '20px', fill: '#000000' });
    const rank = this.add.text(150, 180, '', { font: '16px ', fill: '#000000' });
    const name = this.add.text(225, 180, '', { font: '16px ', fill: '#000000' });
    const score = this.add.text(300, 180, '', { font: '16px', fill: '#000000' });

      rank.setText([
                 ' 1  ',' 2  ', ' 3  ', ' 4  ',' 5  ',
                ' 6  ',' 7  ',' 8  ',' 9  ',' 10 ',
            ]);
      name.setText([
                ' dad  ',' fdf  ', ' ewr  ', ' xxx  ',' bth  ',
                ' AAA ',' QWERT  ',' popo  ',' )OII  ',' RERF ',
            ]);
      score.setText([
                ' 100000  ',' 40000  ', ' 30000 ', ' 25000  ',' 20000  ',
                ' 17000  ',' 16000  ',' 15000  ',' 14000  ',' 13000 ',
            ]);

    const button = this.add.text(50, 75, 'Close', {font: '20px Bold', fill: '#000000' })
      .setPadding(10)
      .setStyle({ backgroundColor: '#D1D0CE' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Button'));
  
    }
  update(){}

}



 


