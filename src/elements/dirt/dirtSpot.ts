import { state } from "src/state"
import { InteractibleEntity } from "../../components/interactible"

export abstract class DirtSpot extends InteractibleEntity {
    public readonly interactions: Array<string> = ["waterable", "plantable"]
    public readonly plantTypes: Array<string> = [
        "cabbage",
        "carrot",
        "cucumber",
        "onion",
        "potato",
        "pumpkin",
        "tomato",
    ]
    public isWatered: boolean = false
    public isFertilized: boolean = false
    public hasPlant: boolean = false
    public plantType?: string | null = null
    public plantStage: number | null = null

    constructor() {
        super()
    }

    public abstract water(): void
    public abstract plant(plantTypeName: string, stage: number): void
}

