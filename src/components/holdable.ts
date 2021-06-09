import { state } from "src/state"
import { InteractibleEntity, findInteractibleEntityByName, isInteractible } from "./interactible"

export abstract class HoldableEntity extends Entity {
    public abstract holdingPosition: Vector3
    public abstract holdingRotation: Quaternion
    public readonly class: string = 'HoldableEntity'
    public readonly interactions: Array<string> = []

    constructor() {
        super()

        this.addComponent(
            new OnPointerDown(
              () => {
                if(!state.isHolding){ this.pickUp() }
              },
              {
                button: ActionButton.PRIMARY,
                showFeedback: true,
                hoverText: "Pick Up",
              }
            )
        )
    }

    pickUp(){
        log('Picking Up')
        state.isHolding = true
        state.isHoldingEntityName = this.uuid
        this.setParent(Attachable.FIRST_PERSON_CAMERA)
        this.getComponentOrCreate(Transform).position = this.holdingPosition
        this.getComponentOrCreate(Transform).rotation = this.holdingRotation
    }

    putDown(position: Vector3){
        log('Putting Down')
        let transform = this.getComponent(Transform)
        state.isHolding = false
        state.isHoldingEntityName = null
        transform.position = position
        transform.rotation = new Quaternion()
        this.setParent(null)
    }

    public abstract useItem(target: InteractibleEntity): void
}

const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, true, (event) => {
    const entity = state.isHoldingEntityName ? findHoldableEntityByName(state.isHoldingEntityName) : null
    if(state.isHolding && event.hit){
        if(event.hit.normal.y == 1 && entity){
            entity.putDown(event.hit.hitPoint)
        }
    }
});


input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (event) => {
    const entity = state.isHoldingEntityName ? findHoldableEntityByName(state.isHoldingEntityName) : null
    if(!entity){ return }
    if(state.isHolding && event?.hit?.entityId){
        let targetId = event.hit.entityId
        let target = engine.entities[targetId] as InteractibleEntity
        if(isInteractible(target)){
            let targetInteractions = target.interactions.filter(element => entity.interactions.indexOf(element) !== -1)
            if(targetInteractions.length){
                entity.useItem(target as InteractibleEntity)
            }
        }
    }
});

export const isHoldable = (entity: HoldableEntity) : boolean => entity.class == "HoldableEntity"
export const findHoldableEntityByName = (name: string) : HoldableEntity | null => engine.entities[name] as HoldableEntity
