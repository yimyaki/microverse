class SpawnActor{
    setup(){
        this.dataloc = this.__cardData.spawnDataLocation;
        this.trans = this.__cardData.translation;
        this.listen("spawn","spawn")
    }
    spawn(){
        let spawn = this.createCard({
            translation: this.trans,
            scale: [1, 1, 1],
            rotation: [0, 0, 0, 1],
            layers: ["pointer"],
            name: "spawned_object",
            cornerRadius: 0.02,
            behaviorModules: ["Snow"],
            fullBright: false,
            shadow: true,
            singleSided: true,
            type: "3d",
            dataLocation: this.dataloc,
        });
    }
}

class SpawnPawn{

}

export default {
    modules: [
        {
            name: "Spawn",
            actorBehaviors: [SpawnActor],
            pawnBehaviors: [SpawnPawn]
        },
    ]
}