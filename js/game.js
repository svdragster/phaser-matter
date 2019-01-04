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
        var copiedWorld = getWorldFromJson(world.toJson());
        console.log("COPIED WORLD");
        //console.log(JSON.parse(world.toJson()));
        console.log(copiedWorld);
        console.log("SSDFSDFSDF");
        for (const obj of copiedWorld.gameObjects) {
            console.log(obj);
            //obj.world = this.matter.world;
            var newSprite = this.matter.add.sprite(0, 0, obj.textureKey);
            var newObj = Object.assign(newSprite/*new Phaser.Physics.Matter.Sprite(this.matter.world, 0, 0, obj.textureKey)*/, obj);
            console.log(newObj);
        }
        //console.log(parentScene);

        this.createInputListeners(parentScene);
        this.initPhysics();

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

        this.input.keyboard.on('keydown_A', function(event) {
            ref.player.keyA = true;
        });
        this.input.keyboard.on('keydown_D', function(event) {
            ref.player.keyD = true;
        });
        this.input.keyboard.on('keyup_A', function(event) {
            ref.player.keyA = false;
        });
        this.input.keyboard.on('keyup_D', function(event) {
            ref.player.keyD = false;
        });
        this.input.keyboard.on('keydown_SPACE', function(event) {
            console.log(ref.player);
            if (Math.abs(ref.player.body.velocity.y) <= 0.5)
                ref.player.setVelocityY(-10);
        });
    },

    initPhysics: function() {
        this.maxPlayerSpeed = 5.0;
        var sensorOnGround = Phaser.Physics.Matter.Matter.Bodies
                                .circle(0, 90, 24, { isSensor: true, label: 'onGround' });

        var rect = Phaser.Physics.Matter.Matter.Bodies.rectangle(00, 80, 32, 48);

        this.matter.world.on('collisionstart', function (event) {

        });
        this.matter.world.on('collisionend', function (event) {

        });

        /*this.sensors = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect, sensorOnGround ]/*,
            inertia: Infinity* /
        });*/
        this.player = this.matter.add.sprite(400, 100, 'dude');
        this.player.velX = 0;
        //this.player.setExistingBody(this.sensors);
    },

    update: function() {
        this.updatePlayer();
    },

    updatePlayer: function() {
        this.player.setAngle(0);
        if (this.player.keyA) {
            if (this.player.velX > 0) this.player.velX = 0;
            this.player.velX -= 0.3;
            this.player.velX *= 1.02;
            if (this.player.velX < -this.maxPlayerSpeed)
                this.player.velX = -this.maxPlayerSpeed;
            this.player.setVelocityX(this.player.velX);
        }
        if (this.player.keyD) {
            if (this.player.velX < 0) this.player.velX = 0;
            this.player.velX += 0.3;
            this.player.velX *= 1.02;
            if (this.player.velX > this.maxPlayerSpeed)
                this.player.velX = this.maxPlayerSpeed;
            this.player.setVelocityX(this.player.velX);
        }
    },

    loadWorld: function(world) {
        console.log(world);
    },

    stopPlaying: function() {
        var editorScene = this.scene.start("EditorScene");
    }
});
