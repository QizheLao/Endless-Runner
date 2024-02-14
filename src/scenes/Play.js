class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.platformSpeed = -100
        this.platformSpeedMax = -1000

        this.playerWidth = 16
        this.playerHeight = 128
        this.playerVelocity = 150
        this.playerX = 32
        this.playerGravity = 500
        this.playerBounce = 0.5
        this.playerSpeed = 350

        this.level = 0

        this.backgroundSpeed = 0.33
    }

    create() {
        // set up audio, play bgm
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.4,
            rate: 1,
            loop: true 
        })
        this.bgm.play()

        this.background = this.add.tileSprite(0, 0, 480, 480, 'Background').setOrigin(0, 0).setScale(5)

        // Dynamically calculate center X and Y position
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.deadzoneUp = this.add.tileSprite(0, 435, 480, 13, 'SpikeUp').setOrigin(0, 0).setScale(4.5)
        this.deadzoneDown = this.add.tileSprite(0, 0, 480, 13, 'SpikeDown').setOrigin(0, 0).setScale(2)

        //this.wall = this.add.tileSprite(0, 0, 10, 480, 'Wall').setOrigin(0, 0).setScale(1.5)
        //this.wall2 = this.add.tileSprite(465, 0, 10, 480, 'Wall').setOrigin(0, 0).setScale(1.5)

        // create animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', {
                start: 1,
                end: 2
            })
        })

        // set up player (physics sprite) and set properties
        this.player = this.physics.add.sprite(centerX, centerY - this.playerHeight, 'Player').setOrigin(0.5).setScale(1.5)
        this.player.setCollideWorldBounds(true)
        //this.player.setBounce(this.playerBounce)
        //this.player.setImmovable()
        this.player.destroyed = false       // custom property to track player life
        this.player.setBlendMode('SCREEN')  // set a WebGL blend mode

        
        this.physics.world.enable(this.player) // Enable physics
        this.player.setGravityY(this.playerGravity) // Set gravity for the player
        this.player.setCollideWorldBounds(true) // Enable collision with the world bounds

        this.physics.world.enable(this.deadzoneUp)
        this.physics.world.enable(this.deadzoneDown)

        // set up platform group
        this.platformGroup = this.add.group({
            runChildUpdate: true,    // make sure update runs on group children          
        })


        this.addPlatform1() 

        this.physics.add.collider(this.player, this.platformGroup, this.landSound, null, this)


        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        })

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
        
    }

    // create new platform
    addPlatform1() {
        let platform = new Platform1(this, this.platformSpeed, this.playerWidth, this.playerHeight).setScale(2)
        this.platformGroup.add(platform)
    }

    update() {
        this.background.tilePositionY += this.backgroundSpeed
        //this.wall2.tilePositionY += 1
        // make sure player is still alive
        if(!this.player.destroyed) {
            // check for player input
            if(cursors.left.isDown) {
                this.player.setVelocityX(-this.playerSpeed)
            } else if(cursors.right.isDown) {
                this.player.setVelocityX(this.playerSpeed)
            } else {
                this.player.setVelocityX(0) // Stop
            }
            // check for collisions
            this.physics.add.overlap(this.player, this.deadzoneUp, this.playerDead, null, this)
            this.physics.add.overlap(this.player, this.deadzoneDown, this.playerDead, null, this)
        }

    }

    landSound(){
        this.sound.play('land', { volume: 0.25 })
    }

    levelBump() {
        // increment level
        this.level++
    
        // bump speed every 5 levels (until max is hit)
        if(this.level % 5 == 0) {
            this.backgroundSpeed += 0.05
            console.log("bg up", this.backgroundSpeed)
            console.log(`level: ${this.level}, speed: ${this.platformSpeed}`)
            this.sound.play('levelup', { volume: 0.5 })
            if(this.platformSpeed >= this.platformSpeedMax) {     // increase platform speed
                this.platformSpeed -= 20
                console.debug("speedup".platformSpeed)
            }
            
            // make flying score text (using three stacked)
            let lvltxt01 = this.add.bitmapText(w, centerY, 'gem', `<${this.level}>`, 96).setOrigin(0, 0.5)
            let lvltxt02 = this.add.bitmapText(w, centerY, 'gem', `<${this.level}>`, 96).setOrigin(0, 0.5)
            let lvltxt03 = this.add.bitmapText(w, centerY, 'gem', `<${this.level}>`, 96).setOrigin(0, 0.5)
            lvltxt01.setBlendMode('ADD').setTint(0xff00ff)
            lvltxt02.setBlendMode('SCREEN').setTint(0x0000ff)
            lvltxt03.setBlendMode('ADD').setTint(0xffff00)
            this.tweens.add({
                targets: [lvltxt01, lvltxt02, lvltxt03],
                duration: 2500,
                x: { from: w, to: 0 },
                alpha: { from: 0.9, to: 0 },
                onComplete: function() {
                    lvltxt01.destroy()
                    lvltxt02.destroy()
                    lvltxt03.destroy()
                }
            })
            this.tweens.add({
                targets: lvltxt02,
                duration: 2500,
                y: '-=20'       // slowly nudge y-coordinate up
            })
            this.tweens.add({
                targets: lvltxt03,
                duration: 2500,
                y: '+=20'       // slowly nudge y-coordinate down
            })

            this.cameras.main.shake(100, 0.01)
        }

    }

    playerDead() {
        this.player.destroyed = true               // turn off collision checking
        this.difficultyTimer.destroy()             // shut down timer
        this.sound.play('death', { volume: 0.25 }) // play death sound
        this.cameras.main.shake(2500, 0.0075)      // camera death shake
        
        // add tween to fade out audio
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        })

        // store current player bounds so we can create a player-shaped death emitter
        let pBounds = this.player.getBounds()
        // set up particle emitter
        let deathEmitter = this.add.particles(0, 0, 'cross', {
            alpha: { start: 1, end: 0 },
            scale: { start: 0.75, end: 0 },
            speed: { min: -150, max: 150 },
            lifespan: 4000,
            blendMode: 'ADD',
            emitZone: {
                source: new Phaser.Geom.Rectangle(pBounds.x, pBounds.y, pBounds.width, pBounds.height),
                type: 'edge',
                quantity: 1000
            }          
        })
        // make it boom 💥
        deathEmitter.explode(1000)
        // create two gravity wells: one offset from player x-position and one at center screen
        deathEmitter.createGravityWell({
            x: pBounds.centerX + w / 4,
            y: pBounds.centerY,
            power: 0.5,
            epsilon: 100,
            gravity: 100
        })
        deathEmitter.createGravityWell({
            x: centerX,
            y: centerY,
            power: 2,
            epsilon: 100,
            gravity: 150
        })
       
        // kill player
        this.player.destroy()   

        // switch scenes after timer expires, passing current level to next scene
        this.time.delayedCall(4000, () => { this.scene.start('gameOverScene', { level: this.level }) })
    }
}