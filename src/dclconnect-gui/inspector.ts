import { canvas } from "./core/canvas"
import { DynamicImage } from "./core/dynamicImage"

export const guiInspectorTexture = new Texture("images/gui/gui-inspector.png")
export const guiInspectorImage = () : DynamicImage => {
    /* Initial Values */
    let image = new UIImage(canvas, guiInspectorTexture)
    image.name = "guiInspector"
    image.width = 139
    image.height = 175
    image.positionX = 20
    image.positionY = -30
    image.vAlign = "bottom"
    image.hAlign = "left"
    image.sourceLeft = 0
    image.sourceTop = 0
    image.sourceWidth = 139
    image.sourceHeight = 175
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}


export const guiItemSheetTexture = new Texture("images/icon-sprite-sheet.png")
export const InspectorDynamicImage = () : DynamicImage => {
    let image = new UIImage(canvas, guiItemSheetTexture)
    image.width = 90
    image.height = 90
    image.positionX = 44
    image.positionY = 20
    image.vAlign = "bottom"
    image.hAlign = "left"
    image.sourceLeft = 90
    image.sourceTop = 90
    image.sourceWidth = 90
    image.sourceHeight = 90
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}

export class InspectorImage {
    private inspectorFrame: DynamicImage
    private guiItemIcon: DynamicImage 

    constructor() {
        this.inspectorFrame = guiInspectorImage()
        this.guiItemIcon = InspectorDynamicImage()
        this.showImageIndex(0)
    }

    showImageIndex(index: number) {
        let x = index % 6
        let y = Math.floor(index/6)
        this.guiItemIcon.moveSourceTo(new Vector2(x*90,y*90), 0)
    }
}

export const InspectorGUI = new InspectorImage()