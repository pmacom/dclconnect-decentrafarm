import { state } from "src/state"
import { InteractibleEntity } from "./interactible"

export abstract class Waterable extends InteractibleEntity {
    public readonly interactions: Array<string> = ["waterable"]
    public isWatered: boolean = false

    constructor() {
        super()
    }

    public abstract water(): void
}