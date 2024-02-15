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
            // see if current score is higher than stored score
            if(this.level > storedScore) {
                localStorage.setItem('hiscore', this.level.toString())
                highScore = this.level
                newHighScore = true
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'))
                newHighScore = false
            }
        } else {
            highScore = this.level
            localStorage.setItem('hiscore', highScore.toString())
            newHighScore = true
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - textSpacer*2, 'gem', 'New Hi-Score!', 32).setOrigin(0.5)
        }
        this.add.bitmapText(centerX, centerY + -textSpacer*3, 'gem', `Audio bgm, death, LVup ftom: MaouDamashii`, 15).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + -textSpacer, 'gem', `YOU DIED`, 48).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem', `You Survived ${this.level}s`, 30).setOrigin(0.5)
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

            // start next scene
            this.sound.play('click2', { volume: 1 })
            this.scene.start('playScene')
        }
    }
}