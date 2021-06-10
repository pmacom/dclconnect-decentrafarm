export class Storefront extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/storefront.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}