class Platform1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, platformWidth, platformHeight) {
        // Adjusted to place platform at a random bottom location
        super(scene, Phaser.Math.Between(0, game.config.width - platformWidth), game.config.height - platformHeight/2, 'NormalPlatform')
        
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system

        this.setVelocityY(-Math.abs(velocity)) // Ensure negative velocity to move up
        this.setImmovable(true)                  
        //this.tint = Math.random() * 0xFFFFFF   // randomize tint
        this.newplatform = true   
        
    }

    update() {
        //if(this.newplatform && this.y < game.config.height / 2)
        if(this.newplatform && this.y < 480) {
            this.parentScene.addPlatform1(this.parent, this.velocity)
            this.newplatform = false
        }
        
        // Correct condition to destroy the platform at the top edge
        if(this.y < 0) {
            this.destroy()
        }
    }
}