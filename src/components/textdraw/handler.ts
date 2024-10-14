import { nativeFunctions } from "@/natives"
import { EntityFactory, EntityHandler } from "../../lib/entity"
import { Textdraw } from "./entity"

const textdrawFactory = new EntityFactory<Textdraw, typeof Textdraw>(Textdraw)

class TextdrawHandler extends EntityHandler<Textdraw> {
    new(x: number, y: number, text: string) {
        const textdrawId = nativeFunctions.textDrawCreate(x, y, text)
        const textdraw = textdrawFactory.new(textdrawId, { x, y }, text)

        textdraw?.onCleanup(() => {
            nativeFunctions.textDrawDestroy(textdrawId)
        })

        return textdraw
    }
}

export const textdrawHandler = new TextdrawHandler(textdrawFactory)
