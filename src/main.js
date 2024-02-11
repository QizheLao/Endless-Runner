let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: [ Load, Menu, Play, GameOver ]
  }

let game = new Phaser.Game(config)



// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//reserve keyboard bindings
let keyLEFT, keyRIGHT