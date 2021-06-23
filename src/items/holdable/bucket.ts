import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";
import { GUIItemImage } from "src/dclconnect-gui/assets/inspector";
import { DynamicImage } from "src/dclconnect-gui/core/dynamicImage";

export class ItemBucket extends HoldableEntity {
    public holdingPosition: Vector3 = new Vector3(0, 1, 1)
    public holdingRotation: Quaternion = new Quaternion().setEuler(90, 90, 90)
    public interactions: Array<string> = ["fillable"]
    public spriteIndex: number = 0
    public GUIName: string = "Bucket"
    public metadata = { }

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/items/bucket.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    useItem(target: InteractibleEntity){

    }
}