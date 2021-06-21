
export class Grass extends Entity {
    private grass: Entity = new Entity('Grass')
    private grass2: Entity = new Entity('Grass2')
    private grassShape = new GLTFShape("models/environment/grass.glb")

    constructor() {
        super()
        this.grassShape.withCollisions = true
        this.grassShape.isPointerBlocker = true
        this.grassShape.visible = true

        this.grass.addComponent(this.grassShape)
        this.grass.addComponent(new Transform({
            position: new Vector3(8, 0, 8),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        }))

        this.grass2.addComponent(this.grassShape)
        this.grass2.addComponent(new Transform({
            position: new Vector3(-8, 0, 8),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        }))

        engine.addEntity(this.grass)
        engine.addEntity(this.grass2)
    }
}