// Qizhe Lao
// Game Name: Call Don't fall
// Trying to survive on these constantly rising platforms
// Spent about 34 hour
// For the code, I redesigned the density and speed of the generating platforms, the player's physics and the movement method to make the game play smoother. 
// For the art, I'm very satisfied with the backgrounds, player, and platforms I made. 
// Keeping the art styles of both similar while still maintaining recognizable features took me quite a bit of time.

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
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
