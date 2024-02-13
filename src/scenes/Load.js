class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        this.load.image('Background', 'img/Background.png')
        this.load.image('NormalPlatform', 'img/NormalPlatform.png')
        this.load.image('Player', 'img/Player.png')
        this.load.image('SpikeDown', 'img/SpikeDown.png')
        this.load.image('SpikeUp', 'img/SpikeUp.png')
        this.load.image('Wall', 'img/Wall.png')
        
        // load audio assets
        this.load.audio('bgm', ['audio/Bgm.mp3'])
        this.load.audio('click', ['audio/Click.mp3'])
        this.load.audio('death', ['audio/Dead.mp3'])
        this.load.audio('land', ['audio/Land.mav'])
        this.load.audio('walk', ['audio/Walk.wav'])
        this.load.audio('levelup1', ['audio/maou_se_8bit15.mp3'])
        this.load.audio('levelup2', ['audio/maou_se_8bit10.mp3'])
        // load font
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml')
    }

    create() {
        // check for local storage browser support
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')

        // go to Title scene
        this.scene.start('titleScene')
    }
}