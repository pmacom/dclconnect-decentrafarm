import { state } from "src/state"
import { InteractibleEntity } from "./interactible"

export abstract class DirtSpot extends InteractibleEntity {
    public readonly interactions: Array<string> = ["waterable", "plantable"]
    public isWatered: boolean = false
    public hasPlant: boolean = false

    constructor() {
        super()
    }

    public abstract water(): void
    public abstract plant(): void
}