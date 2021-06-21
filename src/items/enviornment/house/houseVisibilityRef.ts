import { TriggerCollider } from "src/components/triggerCollider/triggerCollider"
import { House } from "./house"

let debounceTimer = 0
let debounceSpeed = .2
let physicsCast = PhysicsCast.instance
let triggerSize = 1.5
let extraHeight = 1.5

@Component("buildingVisibilityRef")
export class BuildingVisibilityRef {}

let houseVisibilityRef = new TriggerCollider({
  position: new Vector3(0,0,0),
  scale: new Vector3(triggerSize, triggerSize+extraHeight, triggerSize),
  layerName: "houseVisibilityRef",
  triggerLayers: ["buildingPiece"],
  withCollisions: false,
  enableDebug: false,
  onTriggerEnter: () => {}, //log('ref enter')},
  onTriggerExit: () => {}, //log('ref exit')}
})

const buildings = engine.getComponentGroup(BuildingVisibilityRef)
export class BuildingVisibilityColliderCheck implements ISystem {
    update(dt: number) {
        // log('Building Visibility Collider Check - update')
        if(buildings.entities.length && Camera.instance.cameraMode == CameraMode.ThirdPerson) {
            debounceTimer += dt
            log('Building Visibility Collider Check - entties length and cameramode check')
            if(debounceTimer >= debounceSpeed){
                log('Building Visibility Collider Check - debounced event')
                let distance = 1000
                let ray = physicsCast.getRayFromCamera(distance)
                physicsCast.hitAll(ray, onNormalRay, Math.random()*100)
                debounceTimer = 0;
            }
        } else if (buildings.entities.length){
            buildings.entities.map(building => {
                let b = building as House
                b.pieces.map(piece => {
                    piece.show()
                })
            })
        }
        
    }
}
engine.addSystem(new BuildingVisibilityColliderCheck())

const reverseDirection = (direction: ReadOnlyVector3) : Vector3 => {
    return new Vector3(direction.x, direction.y, direction.z).negate()
}

const onNormalRay = (e: RaycastHitEntities): void => {
    if(e.entities[0] && e.entities[0].hitPoint){
        let target = hitPointToVector3(e.entities[0].hitPoint)
        let direction = reverseDirection(e.ray.direction)
        let distance = 1000
        let initialRay: Ray = { origin: target, distance, direction }
        // houseVisibilityRef.setPosition(hitPointToVector3(e.entities[0].hitPoint))
        // log(e.entities[0].hitPoint)
        physicsCast.hitAll(initialRay, onReverseRay, Math.random()*100)
    }
}

const hitPointToVector3 = (hitPoint: ReadOnlyVector3) : Vector3 => {
    return new Vector3(hitPoint.x, hitPoint.y, hitPoint.z)
}

const onReverseRay = (e: RaycastHitEntities): void => {
    if(e.entities[0] && e.entities[0].hitPoint){
        // debugger;
        houseVisibilityRef.setPosition(hitPointToVector3(e.entities[0].hitPoint))
    }
}