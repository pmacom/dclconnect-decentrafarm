
export class Toolbox extends Entity {
    private toolbox: Entity = new Entity('Toolbox')
    private toolboxShape = new GLTFShape("models/environment/toolbox.gltf")

    constructor(
        transform: Transform
    ) {
        super()
        this.toolboxShape.withCollisions = true
        this.toolboxShape.isPointerBlocker = true
        this.toolboxShape.visible = true

        this.toolbox.addComponent(this.toolboxShape)
        this.toolbox.addComponent(transform)

        engine.addEntity(this.toolbox)
    }
}