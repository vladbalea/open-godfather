import { nativeEvents } from "@/wrapper"
import { playerHandler } from "../../handler"
import { dialogPromises } from "../instance"

nativeEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playerHandler.atSampId(playerId)

    if (player) {
        const action = Boolean(responseParam)

        if (action) {
            dialogPromises.resolve(player, { action, item: listItemParam, input: inputText })
        } else {
            dialogPromises.resolve(player, { action })
        }
    }
})