var editorWorld = undefined;

var editorScene = new Phaser.Class({

    // it extends Phaser.Scene
    Extends: Phaser.Scene,

    // scene initialization
    initialize:

    // constructor
    function editorScene() {

        // calling the scene, assigning it "PlayGame" key
        Phaser.Scene.call(this, {key: "EditorScene"});
        editorWorld = new World();

    },

    // function to be executed when the scene is loading
    preload: function(){
        this.scene.launch("EditorUIScene");
        // loading crate image
        loadAssetsOnce(this);
    },

    // function to be executed once the scene has been created
    create: function() {

        // setting Matter world bounds
        this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

        editorWorld.store(this.matter.add.sprite(400, 550, 'platform', null, { isStatic: true }));

        // waiting for user input
        this.input.on("pointerdown", function(pointer){

            // getting Matter bodies under the pointer
            var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

            // if there isn't any body under the pointer...
            if(bodiesUnderPointer.length == 0){

                // create a crate
                var sprite = this.matter.add.sprite(pointer.x, pointer.y, "platform")
                //var mySprites = [];
                //mySprites.push(sprite);
                //console.log(mySprites);
                //console.log(sprite.toJSON());
                //console.log(JSON.stringify(mySprites));
                editorWorld.store(sprite);
            }

            // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
            // bound to a Matter body, so I am setting it to invisible, then remove the body.
            else{
                bodiesUnderPointer[0].gameObject.visible = false;
                this.matter.world.remove(bodiesUnderPointer[0])
            }
        }, this);
    },

    updateWorld: function(world) {
        console.log(this.scene.children);
        world.gameObjects = this.scene.children;
    }
});

//export default editorScene;
