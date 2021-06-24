
export class StorageBin extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/items/storageBin.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}