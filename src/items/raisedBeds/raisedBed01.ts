import { Waterable } from "src/components/waterable"
import { Dirt } from "../../elements/dirt/dirt"
interface IPlotData {
    plantType?: string | null
    stage: number
    isWet: boolean
}

let stage = 0
// let plotData: Array<IPlotData> = [
//     { plantType: "cabbage", stage: stage, isWet: false },
//     { plantType: "carrot", stage: stage, isWet: false },
//     { plantType: "cucumber", stage: stage, isWet: false },
//     { plantType: "onion", stage: stage, isWet: true },
//     { plantType: "potato", stage: stage, isWet: true },
//     { plantType: "pumpkin", stage: stage, isWet: false },
//     { plantType: "tomato", stage: stage, isWet: false },
//     { plantType: null, stage: stage, isWet: false }
// ]
let plotData: Array<IPlotData> = [
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false },
    { plantType: null, stage: stage, isWet: false }
]

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

export class RaisedBed01 extends Entity {
    private dirtSpots: Array<Waterable> = []

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/environment/raisedBed01.gltf'))
        this.addComponent(transform)

        this.dirtSpots = dirtPositions.map((([x,y,z], index) => {
            let ptype = plotData[index].plantType as string
            let d = new Dirt(
                new Transform({ position: new Vector3(x, y, z) }),
                plotData[index].stage + 1,
                plotData[index].isWet,
                ptype
            )
            d.setParent(this)
            return d;
        }))
       
        engine.addEntity(this);
    }
}