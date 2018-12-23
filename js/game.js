// playGame Class
var playGame = new Phaser.Class({

    // it extends Phaser.Scene
    Extends: Phaser.Scene,

    // scene initialization
    initialize:

    // constructor
    function playGame() {

        // calling the scene, assigning it "PlayGame" key
        Phaser.Scene.call(this, {key: "PlayGameScene"});
    },

    // function to be executed when the scene is loading
    preload: function() {
        // loading crate image
        loadAssetsOnce(this);
    },

    // function to be executed once the scene has been created
    create: function(params) {
        var world       = params[0];
        var parentScene = params[1];
        var ref = this;
        console.log(world.toJson());
        console.log(parentScene);

        this.createInputListeners(parentScene);



        // setting Matter world bounds
        this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

        //this.matter.add.image(400, 550, 'box', null, { isStatic: true });

        // waiting for user input
        this.input.on("pointerdown", function(pointer) {

            // getting Matter bodies under the pointer
            var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

            // if there isn't any body under the pointer...
            if (bodiesUnderPointer.length == 0) {

                // create a crate
                this.matter.add.image(pointer.x, pointer.y, 'crate');
            } else {
                // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
                // bound to a Matter body, so I am setting it to invisible, then remove the body.
                bodiesUnderPointer[0].gameObject.visible = false;
                this.matter.world.remove(bodiesUnderPointer[0])
            }
        }, this);
    },

    createInputListeners: function(parentScene) {
        var ref = this;
        if (parentScene != undefined && parentScene.key == "EditorUIScene") {
            this.input.keyboard.on('keydown_ENTER', function (event) {
                ref.stopPlaying();
            });
        }
    },

    loadWorld: function(world) {
        console.log(world);
    },

    stopPlaying: function() {
        var editorScene = this.scene.start("EditorScene");
    }
});
