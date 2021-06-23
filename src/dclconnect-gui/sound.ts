export class Sound extends Entity {
    constructor(audio: AudioClip, loop: boolean = false, transform?: Vector3) {
      super()
      engine.addEntity(this)
      this.addComponent(new AudioSource(audio))
      this.getComponent(AudioSource).loop = loop
      this.addComponent(new Transform())
      if (transform) {
        this.getComponent(Transform).position = transform
      } else {
        this.getComponent(Transform).position = Camera.instance.position
      }
    }
  
    playAudioOnceAtPosition(transform: Vector3): void {
      this.getComponent(Transform).position = transform
      this.getComponent(AudioSource).playOnce()
    }
  
    playAudioAtPosition(transform: Vector3): void {
      this.getComponent(Transform).position = transform
      this.getComponent(AudioSource).playing = true
    }
}

class RandomSound {
    constructor(public sounds: Array<Sound>){}
    get(): Sound {
        return this.sounds[Math.floor(Math.random()*this.sounds.length)];
    }
}

export const RandomWaterSound = new RandomSound([
    new Sound(new AudioClip("sounds/water_lap1.mp3")),
    new Sound(new AudioClip("sounds/water_lap2.mp3")),
    new Sound(new AudioClip("sounds/water_lap3.mp3")),
])

export const RandomPlantSeedSound = new RandomSound([
    new Sound(new AudioClip("sounds/plant_seed.mp3")),
])
