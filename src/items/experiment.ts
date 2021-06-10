export class Experiment extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/exp.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}