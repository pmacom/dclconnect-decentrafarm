
export class FestivalBin extends Entity {
    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/festivalbin.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}