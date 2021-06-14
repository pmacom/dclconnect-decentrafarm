import * as utils from '@dcl/ecs-scene-utils'

export class House extends Entity {
    public interiorZone: Entity = new Entity()

    public roof: BuildingPiece = new BuildingPiece('models/environment/house2_roof.gltf')
    public front: BuildingPiece = new BuildingPiece('models/environment/house_front.gltf')
    public side1: BuildingPiece = new BuildingPiece('models/environment/house_side1.gltf')
    public side2: BuildingPiece = new BuildingPiece('models/environment/house_side2.gltf')
    public posts: BuildingPiece = new BuildingPiece('models/environment/house_posts.gltf')
    public back: BuildingPiece = new BuildingPiece('models/environment/house_back.gltf')

    private triggerComponent: utils.TriggerComponent | null = null
    private handleVisibility: boolean = Camera.instance.cameraMode == CameraMode.ThirdPerson

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/house.gltf'))
        this.addComponent(transform)

        // this.roof.setParent(this)
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
            enableDebug: true
        })
        
        this.triggerComponent = new utils.TriggerComponent(triggerBox, {
            onCameraEnter: () => this.roof.hide(),
            onCameraExit: () => this.roof.show(),
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

    constructor(
        modelSrc: string
    ) {
        super()
        this.addComponent(new GLTFShape(modelSrc))
        this.addComponent(new BuildingHiddableEntity())
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

class testObject extends Entity {
    public sphereShape: SphereShape = new SphereShape()

    constructor(){
        super()
        this.addComponent(this.sphereShape)
        this.sphereShape.withCollisions = false
        this.addComponent(new Transform({
            scale: new Vector3(.2, .2, .2)
        }))
        engine.addEntity(this)
    }
}

const t1 = new testObject()
const t2 = new testObject()

export class HouseCameraHidder implements ISystem {
    update(dt: number) {
  
      // On Hover
      debounceTimer += dt
      if(debounceTimer >= debounceSpeed){
        physicsCast.hitAll(
        physicsCast.getRayFromCamera(1000),
            (e) => {
                log(e)

                let target = new Vector3(
                    e.entities[0].hitPoint.x,
                    e.entities[0].hitPoint.y,
                    e.entities[0].hitPoint.z,
                )

                let camPosition = Camera.instance.position
                let cam = new Vector3(
                    camPosition.x,
                    camPosition.y*-1,
                    camPosition.z
                )

                t1.addComponentOrReplace(new Transform({
                    position: target
                }))

                let reversed = new Vector3(
                    e.ray.direction.x*-1,
                    e.ray.direction.y*-1,
                    e.ray.direction.z*-1,
                )

                let ray: Ray = {
                    origin: target,
                    direction: reversed,
                    distance: 1000,
                }
              
                physicsCast.hitAll(
                    ray,
                    (e) => {
                        t2.addComponentOrReplace(new Transform({
                            position: new Vector3(
                                e.entities[0].hitPoint.x,
                                e.entities[0].hitPoint.y,
                                e.entities[0].hitPoint.z,
                            )
                        }))
                    },
                    0
                )

                //let o = Vector3.Distance(target, cam)
                // log('TESTING')
                // log(o)
                // debugger


            // if(e.entity.entityId){
            //     log(e.entity.entityId)
            // }
          },
          Math.random()*100
        )
        debounceTimer = 0;
      }
    }
  }
  engine.addSystem(new HouseCameraHidder())