import { nativeEvents } from "@/wrapper"
import { commandHandler } from "../handler"
import { dispatcher } from "@/core/dispatcher"
import { playerHandler } from "@/components/player"

nativeEvents.onPlayerCommandText((playerId: number, cmdText: string) => {
    const player = playerHandler.atSampId(playerId)

    if (!player) {
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const commandStr = params[0].toLowerCase()

    params.shift()

    if (commandStr === "/") {
        return 1
    }

    const command = commandHandler.at(commandStr)

    if (command) {
        const hasListeners = dispatcher.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params))

        if (!hasListeners) {
            // The command will be executed directly if no "playerCommand" event listener is defined by the developer.
            void command.callback(player, ...params)
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const hasListeners = dispatcher.emit("playerCommand", player, commandStr, undefined, () => {})

        if (!hasListeners) {
            player.sendMessage("OG: Unknown command.")
        }
    }

    return 1
})