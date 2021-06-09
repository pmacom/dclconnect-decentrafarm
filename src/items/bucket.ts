import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";

export class ItemBucket extends HoldableEntity {
    public holdingPosition: Vector3 = new Vector3(0, 1, 1)
    public holdingRotation: Quaternion = new Quaternion().setEuler(90, 90, 90)
    public interactions: Array<string> = ["fillable"]

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/bucket.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    useItem(target: InteractibleEntity){

    }
}