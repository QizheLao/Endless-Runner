class DeadZone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        // Adjusted to place platform at a random bottom location
        //super(scene, Phaser.Math.Between(0, game.config.width - platformWidth), game.config.height - platformHeight/2, 'NormalPlatform');
        
        //this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system

        //this.setVelocityY(-Math.abs(velocity)); // Ensure negative velocity to move up
        this.setImmovable(true)                    
        //this.tint = Math.random() * 0xFFFFFF   // randomize tint
        //this.newplatform = true   
    }
}