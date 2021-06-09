import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";

export class WateringCan extends HoldableEntity {
    public readonly interactions: Array<string> = ["waterable"]
    public holdingPosition: Vector3 = new Vector3(.3,-.4,.5)
    public holdingRotation: Quaternion = new Quaternion().setEuler(0,35,0)

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/wateringCan.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    useItem(target: InteractibleEntity) {
        log('Watering Can use Item!')
    }
}
