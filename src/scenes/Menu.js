class Menu extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY, 'gem', "Call Don't fall", 60).setOrigin(0.5).setTint(0xff0000)
        let title02 = this.add.bitmapText(centerX, centerY, 'gem', "Call Don't fall", 60).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN')
        let title03 = this.add.bitmapText(centerX, centerY, 'gem', "Call Don't fall", 60).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD')
       
        this.add.bitmapText(centerX, centerY + textSpacer, 'gem', 'Use Left Arrow & Right Arrow', 25).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + textSpacer*1.5, 'gem', 'to keep the character in the screen', 25).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + textSpacer*3, 'gem', 'Press Right ARROW to Start', 36).setOrigin(0.5)
        //this.add.bitmapText(centerX, h - textSpacer, 'gem', 'Nathan Altice 2017-24', 16).setOrigin(0.5)


        // title text tweens
        let yoyoTweenA = this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1
        })
        yoyoTweenA.on('yoyo', () => { this.cameras.main.shake(100, 0.0025) })
        let yoyoTweenB = this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1
        })
        yoyoTweenB.on('yoyo', () => { this.cameras.main.shake(100, 0.0025) })

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.sound.play('click', { volume: 0.25 })

            // start next scene
            this.scene.start('playScene')
        }
    }
}