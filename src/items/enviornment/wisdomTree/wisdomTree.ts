
export class WisdomTree extends Entity {
    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/wisdomTree.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}