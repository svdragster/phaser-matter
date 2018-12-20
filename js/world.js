class WorldLoader {

}

class WorldSaver {

    constructor(world) {

    }

}

class World {

    constructor() {
        this.name        = "myWorld",
        this.json        = undefined;
        this.gameObjects = [];
        console.log(this);
    }

    store(gameObj) {
        this.gameObjects.push(gameObj);
        console.log(this.gameObjects);
        return gameObj;
    }

    toJson() {
        return JSON.stringify(this);
    }

}
