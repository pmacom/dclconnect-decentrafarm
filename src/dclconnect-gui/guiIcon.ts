import { HoldableEntity, HoldableMetaData } from "src/components/holdable"
import { canvas } from "./core/canvas"
import { DynamicImage } from "./core/dynamicImage"

export const GUIIconSpriteTexture = new Texture("images/icon-sprite-sheet.png")

export class GUIImageIcon {
    public image: UIImage 
    constructor(
        width: number,
        height: number,
        positionX: number,
        positionY: number,
        vAlign: string,
        hAlign: string,
    ) {
        this.image = new UIImage(canvas, GUIIconSpriteTexture)
        this.image.width = width
        this.image.height = height
        this.image.positionX = positionX
        this.image.positionY = positionY
        this.image.vAlign = vAlign
        this.image.hAlign = hAlign
        this.image.sourceLeft = 0
        this.image.sourceTop = 0
        this.image.sourceWidth = 90
        this.image.sourceHeight = 90
        this.image.sizeInPixels = true
        this.image.opacity = 1
        this.image.visible = true
        this.image.isPointerBlocker = false
    }

    setImageIndex(index: number) {
        let x = index % 6
        let y = Math.floor(index/6)
        this.image.sourceLeft = x*90
        this.image.sourceTop = y*90
    }
}
