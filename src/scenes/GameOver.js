class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    init(data) {
        this.level = data.level
    }

    create() {
        // check for high score in local storage
        // uncomment console.log statements if you need to debug local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'))
            //console.log(`storedScore: ${storedScore}`)
            // see if current score is higher than stored score
            if(this.level > storedScore) {
                //console.log(`New high score: ${this.level}`)
                localStorage.setItem('hiscore', this.level.toString())
                highScore = this.level
                newHighScore = true
            } else {
                //console.log('No new high score :/')
                highScore = parseInt(localStorage.getItem('hiscore'))
                newHighScore = false
            }
        } else {
            //console.log('No high score stored. Creating new.')
            highScore = this.level
            localStorage.setItem('hiscore', highScore.toString())
            newHighScore = true
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - textSpacer, 'gem', 'New Hi-Score!', 32).setOrigin(0.5)
        }
        this.add.bitmapText(centerX, centerY + -textSpacer, 'gem', `YOU DIED IN`, 48).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem', `You Survived ${this.level}s`, 48).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + textSpacer, 'gem', `This browser's best: ${highScore}s`, 24).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'gem', `Press Right ARROW to Restart`, 30).setOrigin(0.5)

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // wait for UP input to restart game
        if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            let textureManager = this.textures
            console.log(textureManager)
            // take snapshot of the entire game viewport (same as title screen)
            this.game.renderer.snapshot((snapshotImage) => {
                console.log('took snapshot in GameOver')
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot')
                }
                textureManager.addImage('titlesnapshot', snapshotImage)
            })

            // start next scene
            this.scene.start('playScene')
        }
    }
}