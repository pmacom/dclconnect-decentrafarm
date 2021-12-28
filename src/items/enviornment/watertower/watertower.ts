
export class WaterTower extends Entity {
    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/watertower.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}