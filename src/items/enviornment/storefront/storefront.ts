
export class Storefront extends Entity {
    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/storefront.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}