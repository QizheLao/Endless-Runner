let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    render: {
      pixelArt: true
    },
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
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
const textSpacer = 64

let highScore
let newHighScore = false
let cursors

//reserve keyboard bindings
let keyLEFT, keyRIGHT