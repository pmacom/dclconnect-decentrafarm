import * as utils from '@dcl/ecs-scene-utils'

export class House extends Entity {
    public interiorZone: Entity = new Entity()
    public roof: HouseRoof = new HouseRoof()
    private zoneMaterial: Material | null = null
    private triggerComponent: utils.TriggerComponent | null = null

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/house2.gltf'))
        this.addComponent(transform)
        this.roof.setParent(this)
        this.interiorZone.setParent(this)
        engine.addEntity(this);
        this.createInteriorZone()
    }

    private createInteriorZone() {
        /* Set Shape For Zone */
        this.interiorZone.addComponent(new BoxShape())
        this.interiorZone.getComponent(BoxShape).withCollisions = false
        this.interiorZone.addComponent(new Transform({
            position: new Vector3(0,2,-1.5),
            scale: new Vector3(6,3,5), // scale: new Vector3(6,2,1),
        }))
        

        /* Set Material For Zone */
        this.zoneMaterial = new Material()
        this.zoneMaterial.albedoColor = new Color4(1, 0, 0, 0.5)
        this.zoneMaterial.metallic = 1
        this.zoneMaterial.roughness = 1
        this.zoneMaterial.transparencyMode = 3
        this.interiorZone.addComponent(this.zoneMaterial)

        /* Set Trigger For Zone */
        let triggerBox = new utils.TriggerBoxShape(
            new Vector3(6,3,5)
        )
        
        this.triggerComponent = new utils.TriggerComponent(triggerBox, {
            onCameraEnter: () => this.roof.hide(),
            onCameraExit: () => this.roof.show(),
        })
        this.interiorZone.addComponent(this.triggerComponent)
    }
}

export class HouseRoof extends Entity {

    constructor() {
        super()
        this.addComponent(new GLTFShape('models/environment/house2_roof.gltf'))
        engine.addEntity(this);
    }

    hide() {
        if(this.alive){
            engine.removeEntity(this)
        }
    }

    show() {
        if(!this.alive){
            engine.addEntity(this)
        }
    }
}