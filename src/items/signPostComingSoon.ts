export class SignPostComingSoon extends Entity {

    constructor(
        transform: Transform
    ) {
        super()
        this.addComponent(new GLTFShape('models/items/sign_post_coming_soon.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }
}