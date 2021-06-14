import * as utils from '@dcl/ecs-scene-utils'

export class House extends Entity {
    public interiorZone: Entity = new Entity()
    public roof: BuildingPiece = new BuildingPiece('models/environment/house2_roof.gltf')
    public front: BuildingPiece = new BuildingPiece('models/environment/house_front.gltf')
    public side1: BuildingPiece = new BuildingPiece('models/environment/house_side1.gltf')
    public side2: BuildingPiece = new BuildingPiece('models/environment/house_side2.gltf')
    public posts: BuildingPiece = new BuildingPiece('models/environment/house_posts.gltf')
    public back: BuildingPiece = new BuildingPiece('models/environment/house_back.gltf')
    private zoneMaterial: Material | null = null
    private triggerComponent: utils.TriggerComponent | null = null
    private handleVisibility: boolean = Camera.instance.cameraMode == CameraMode.ThirdPerson

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/house2.gltf'))
        this.addComponent(transform)

        this.roof.setParent(this)
        this.front.setParent(this)
        this.side1.setParent(this)
        this.side2.setParent(this)
        this.posts.setParent(this)
        this.back.setParent(this)
        this.interiorZone.setParent(this)

        onCameraModeChangedObservable.add(({ cameraMode }) => {
            this.handleVisibility = cameraMode == CameraMode.ThirdPerson
        })

        engine.addEntity(this);
        this.createInteriorZone()
    }

    private createInteriorZone() {
        /* Set Shape For Zone */
        // this.interiorZone.addComponent(new BoxShape())
        // this.interiorZone.getComponent(BoxShape).withCollisions = false
        this.interiorZone.addComponent(new Transform({
            position: new Vector3(0,2,-1.5),
            // scale: new Vector3(6,3,5), // scale: new Vector3(6,2,1),
        }))
        

        /* Set Material For Zone */
        // this.zoneMaterial = new Material()
        // this.zoneMaterial.albedoColor = new Color4(1, 0, 0, 0.5)
        // this.zoneMaterial.metallic = 1
        // this.zoneMaterial.roughness = 1
        // this.zoneMaterial.transparencyMode = 3
        // this.interiorZone.addComponent(this.zoneMaterial)

        /* Set Trigger For Zone */
        let triggerBox = new utils.TriggerBoxShape(
            new Vector3(5,3,7.5),
            new Vector3(0,0,-.1)
        )
        
        this.triggerComponent = new utils.TriggerComponent(triggerBox, {
            onCameraEnter: () => this.roof.hide(),
            onCameraExit: () => this.roof.show(),
            // enableDebug: true
        })
        this.interiorZone.addComponent(this.triggerComponent)
    }
}

export class BuildingPiece extends Entity {

    constructor(
        modelSrc: string
    ) {
        super()
        this.addComponent(new GLTFShape(modelSrc))
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