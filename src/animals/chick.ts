import { NPC } from '@dcl/npc-scene-utils'

import { Dialog } from '@dcl/npc-scene-utils'

export let CheepCheep: Dialog[] = [
  {
    text: `Cheep! Cheep!`,
    isEndOfDialog: true
  }
]

export class Chick extends Entity {

    constructor() {
        super()

        let myNPC = new NPC(
            {
                position: randomPaths(1)[0],
                scale: new Vector3(2, 2, 2)
            },
            'models/animals/chick.gltf',
            () => {
                myNPC.talk(CheepCheep, 0)
            },
            {
                faceUser: true,
                onlyETrigger: true,
            }
        )

        myNPC.followPath({
            path: randomPaths(10),
            // [
            //     new Vector3(-7, 0, 2),
            //     new Vector3(-10, 0, 5),
            //     new Vector3(-5, 0, 8)
            // ],
            totalDuration: 50,
            loop: true,
            curve: true,
            startingPoint: 0,
            onFinishCallback: () => {
              log('Finished!')
            }
          })

        engine.addEntity(this);
    }
}

const randomPaths = (amountOfPoints: number = 5) : Array<Vector3> => {
    let paths: Array<Vector3> = []
    for(let i=0; i<amountOfPoints; i++){
        paths.push(new Vector3(Math.random()*-10, 0, (Math.random()*10)+2))
    }
    return paths
}