export class House extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/house.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}