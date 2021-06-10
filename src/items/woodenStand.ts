export class WoodenStand extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/wooden_box.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}