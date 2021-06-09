import { state } from "src/state"
import { InteractibleEntity } from "./interactible"

export abstract class DirtSpot extends InteractibleEntity {
    public readonly interactions: Array<string> = ["waterable", "plantable"]
    public readonly plantTypes: Array<string> = ["cabbage"]
    public isWatered: boolean = false
    public isFertilized: boolean = false
    public hasPlant: boolean = false
    public plantType: string | null = null
    public plantStage: number | null = null

    constructor() {
        super()
    }

    public abstract water(): void
    public abstract plant(): void
}

