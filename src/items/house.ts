import * as utils from '@dcl/ecs-scene-utils'
import { TriggerBox } from 'src/components/triggerBox'

export class House extends Entity {
    public interiorZone: Entity = new Entity()

    public roof: BuildingPiece = new BuildingPiece(
        'models/environment/house_roof.gltf',
        new TriggerBox({
            position: new Vector3(0, 0, 0),
            scale: new Vector3(5,2,1),
            layerName: "housePiece",
            triggerLayers: ["houseVisibilityRef"],
            withCollisions: false,
            enableDebug: true,
        })
    )
    // public front: BuildingPiece = new BuildingPiece('models/environment/house_front.gltf')
    // public side1: BuildingPiece = new BuildingPiece('models/environment/house_side1.gltf')
    // public side2: BuildingPiece = new BuildingPiece('models/environment/house_side2.gltf')
    // public posts: BuildingPiece = new BuildingPiece('models/environment/house_posts.gltf')
    // public back: BuildingPiece = new BuildingPiece('models/environment/house_back.gltf')

    private triggerComponent: utils.TriggerComponent | null = null
    private handleVisibility: boolean = Camera.instance.cameraMode == CameraMode.ThirdPerson

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/house.gltf'))
        this.addComponent(transform)

        this.roof.setParent(this)
        // this.front.setParent(this)
        // this.side1.setParent(this)
        // this.side2.setParent(this)
        // this.posts.setParent(this)
        // this.back.setParent(this)
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

        /* Set Trigger For Zone */
        let triggerBox = new utils.TriggerBoxShape(
            new Vector3(5,3,7.5),
            new Vector3(0,0,-.1)
        )

        this.triggerComponent = new utils.TriggerComponent(triggerBox, {
            enableDebug: true
        })
        
        this.triggerComponent = new utils.TriggerComponent(triggerBox, {
            // onCameraEnter: () => this.roof.hide(),
            // onCameraExit: () => this.roof.show(),
            // enableDebug: true
        })
        this.interiorZone.addComponent(this.triggerComponent)
    }
}

@Component("BuildingHiddableEntity")
export class BuildingHiddableEntity {
  constructor() {}
}

export class BuildingPiece extends Entity {
    public isBuildingPiece: boolean = true

    constructor(
        modelSrc: string,
        public triggerBox: TriggerBox,
    ) {
        super()
        let { position } = this.getComponentOrCreate(Transform)
        this.addComponent(new GLTFShape(modelSrc))
        this.addComponent(new BuildingHiddableEntity())
        this.triggerBox.setPosition(position)
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


const BuildingHiddableEntities = engine.getComponentGroup(BuildingHiddableEntity)
let debounceTimer = 0
let debounceSpeed = .2
let physicsCast = PhysicsCast.instance
let houseColliderLayer = 1


const colliderCheckerShape = new utils.TriggerBoxShape(
    new Vector3(.25, .25, .25),
    new Vector3(0,0,0),
)

// const colliderChecker = new Entity()
// const colliderCheckerBoxShape = new BoxShape()
// colliderCheckerBoxShape.withCollisions = false
// colliderChecker.addComponent(colliderCheckerBoxShape)
// colliderChecker.addComponent(new utils.TriggerComponent(
//     colliderCheckerShape,
//     {
//         onTriggerEnter: () => {
//             log('something has entered')
//         },
//         enableDebug: true,
//     }
// ))
// engine.addEntity(colliderChecker)

let triggerSize = 1
let houseVisibilityRef = new TriggerBox({
  position: new Vector3(0,0,0),
  scale: new Vector3(triggerSize, triggerSize, triggerSize),
  layerName: "houseVisibilityRef",
  triggerLayers: ["housePiece"],
  withCollisions: false,
  enableDebug: true,
})

// class testObject extends Entity {
//     public boxShape: BoxShape = new BoxShape()

//     constructor(){
//         super()
        
//         this.addComponent(this.boxShape)
//         this.boxShape.withCollisions = false
//         this.addComponent(new Transform({
//             // position: new Vector3(1,5,1),
//             rotation: new Quaternion().setEuler(45,45,45),
//             scale: new Vector3(.01, .01, .01)
//         }))
//         engine.addEntity(this)
//     }
// }

// const t1 = new testObject()
// const t2 = new testObject()

export class HouseCameraHidder implements ISystem {
    update(dt: number) {
        debounceTimer += dt
        if(debounceTimer >= debounceSpeed){
            let distance = 1000
            let ray = physicsCast.getRayFromCamera(distance)
            physicsCast.hitAll(ray, onNormalRay, Math.random()*100)
            debounceTimer = 0;
        }
    }
}
engine.addSystem(new HouseCameraHidder())

const reverseDirection = (direction: ReadOnlyVector3) : Vector3 => {
    return new Vector3(direction.x, direction.y, direction.z).negate()
}

const onNormalRay = (e: RaycastHitEntities): void => {
    if(e.entities[0] && e.entities[0].hitPoint){
        let target = hitPointToVector3(e.entities[0].hitPoint)
        let direction = reverseDirection(e.ray.direction)
        let distance = 1000
        let initialRay: Ray = { origin: target, distance, direction }
        physicsCast.hitAll(initialRay, onReverseRay, Math.random()*100)
    }
}

const hitPointToVector3 = (hitPoint: ReadOnlyVector3) : Vector3 => {
    return new Vector3(hitPoint.x, hitPoint.y, hitPoint.z)
}

const onReverseRay = (e: RaycastHitEntities): void => {
    if(e.entities[0] && e.entities[0].hitPoint){
        houseVisibilityRef.setPosition(hitPointToVector3(e.entities[0].hitPoint))
    }
}