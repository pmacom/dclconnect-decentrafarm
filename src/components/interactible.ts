import { state } from "src/state"

@Component("InteractibleEntity")
export class InteractibleEntity extends Entity {
    public readonly class: string = 'InteractibleEntity'
    public readonly interactions: Array<string> = []

    constructor() {
        super()
    }

    pickUp(){

    }

    putDown(){

    }

    useItem(){

    }
}

export const isInteractible = (entity: InteractibleEntity) : boolean => entity.class == "InteractibleEntity"
export const findInteractibleEntityByName = (name: string) : InteractibleEntity | null => engine.entities[name] as InteractibleEntity
