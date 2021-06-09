import { DirtSpot } from "src/components/dirtSpot";
import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";
import { Waterable } from "src/components/waterable";

export class SeedCabbage extends HoldableEntity {
    public interactions: Array<string> = ["plantable"]
    public holdingPosition: Vector3 = new Vector3(.3,-.4,.5)
    public holdingRotation: Quaternion = new Quaternion().setEuler(0,35,0)

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/seed_cabbage.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    useItem(target: InteractibleEntity) {
        let t = target as DirtSpot
        t.plant()
    }
}
