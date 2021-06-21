interface PlayerState {
    isHolding: boolean
    isHoldingEntityName: string | null
    currency: number,
    experience: {
        cabbage: number,
        carrot: number,
        cucumber: number,
        onion: number,
        potato: number,
        pumpkin: number,
        tomato: number,
    }
}

export const state : PlayerState = {
    isHolding: false,
    isHoldingEntityName: null,
    currency: 100,
    experience: {
        cabbage: 0,
        carrot: 0,
        cucumber: 0,
        onion: 0,
        potato: 0,
        pumpkin: 0,
        tomato: 0,
    },
}

let regions = [
    {
        name: "plantzone1",
        position: {},
        rotation: {},
        items: [
            { name: "RaisedBed01", position: {}, rotation: {}, },
        ]
    },
    { name: "house" },
]




// export const farmState = {

// }

// interface IPlotData {
//     plantType?: string | null
//     stage: number
//     isWet: boolean
// }

// // position: new Vector3(2,0,8)
// let stage = 3
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