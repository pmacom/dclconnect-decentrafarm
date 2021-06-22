import { DynamicImage } from "../core/dynamicImage"
import { canvas } from "../core/canvas"

export const guiInspectorTexture = new Texture("images/gui/gui-inspector.png")

export const GUIItemImage = (src: string) : DynamicImage => {
    let image = new UIImage(canvas, new Texture(src))
    image.width = 90
    image.height = 90
    image.positionX = 0
    image.positionY = 0
    image.vAlign = "bottom"
    image.hAlign = "left"
    image.sourceLeft = 0
    image.sourceTop = 0
    image.sourceWidth = 90
    image.sourceHeight = 90
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}


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
