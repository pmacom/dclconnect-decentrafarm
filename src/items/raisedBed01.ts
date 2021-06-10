import { Waterable } from "src/components/waterable"
import { Dirt } from "./dirt"

export class RaisedBed01 extends Entity {
    private dirtSpots: Array<Waterable> = []

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/raisedBed01.gltf'))
        this.addComponent(transform)

        let height = .31
        let spacing = 0.72
        let col1 = -.37
        let col2 = .34
        const dirtPositions =  [
            [col1, height, 1.1],
            [col1, height, 1.1-(spacing*1)],
            [col1, height, 1.1-(spacing*2)],
            [col1, height, 1.1-(spacing*3)],
            [col2, height, 1.1],
            [col2, height, 1.1-(spacing*1)],
            [col2, height, 1.1-(spacing*2)],
            [col2, height, 1.1-(spacing*3)],
        ]

        this.dirtSpots = dirtPositions.map((([x,y,z]) => {
            let d = new Dirt(
                new Transform({
                    position: new Vector3(x, y, z),
                    // scale: new Vector3(.65, .65, .65)
                })
            )
            d.setParent(this)
            return d;
        }))
       
        engine.addEntity(this);
    }
}