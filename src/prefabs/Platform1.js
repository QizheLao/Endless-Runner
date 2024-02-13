class Platform1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, platformWidth, platformHeight) {
        // Adjusted to place platform at a random bottom location
        super(scene, Phaser.Math.Between(0, game.config.width - platformWidth), game.config.height - platformHeight/2, 'NormalPlatform');
        
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system

        this.setVelocityY(-Math.abs(velocity)); // Ensure negative velocity to move up
        this.setImmovable()                    
        //this.tint = Math.random() * 0xFFFFFF   // randomize tint
        this.newplatform = true   
    }

    update() {
        
        // Adjust to add new barrier when the platform is about halfway up the screen
        if(this.newplatform && this.y < game.config.height / 2) {
            this.parentScene.addPlatform1(this.parent, this.velocity);
            this.newplatform = false;
        }
        
        // Correct condition to destroy the platform at the top edge
        if(this.y < 0) {
            this.destroy();
        }
    }

//     constructor(scene, velocity, platformWidth, platformHeight) {
//         // call Phaser Physics Sprite constructor
//         //super(scene, game.config.width + platformWidth, Phaser.Math.Between(platformHeight/2, game.config.height - platformHeight/2), 'NormalPlatform') 
//         super(scene, game.config.width + platformWidth, game.config.height - platformHeight/2, 'NormalPlatform');
        
//         this.parentScene = scene               // maintain scene context

//         // set up physics sprite
//         this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
//         this.parentScene.physics.add.existing(this)    // add to physics system
//         //this.setVelocityY(velocity)
//         this.setVelocityY(-Math.abs(velocity));            // make it go!
//         this.setImmovable()                    
//         //this.tint = Math.random() * 0xFFFFFF   // randomize tint
//         this.newplatform = true                 // custom property to control barrier spawning
//     }

//     update() {
//         // add new barrier when existing barrier hits center X
//         if(this.newplatform && this.y < centerY) {
//             // (recursively) call parent scene method from this context
//             this.parentScene.addPlatform1(this.parent, this.velocity)
//             this.newplatform = false
//         }

//         // destroy platform if it reaches the left edge of the screen
//         if(this.y < -this.height) {
//             this.destroy()
//         }
//     }
}