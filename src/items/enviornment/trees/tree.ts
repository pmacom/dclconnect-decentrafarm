
export class Tree extends Entity {
    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/tree1.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}