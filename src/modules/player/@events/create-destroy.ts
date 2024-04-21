import { nativeEvents, sampNatives } from "@/wrapper"
import { playerFactory } from "../factory"
import { dispatcher } from "@/modules/dispatcher"

// TODO: find the actual issue and fix it
// Weird issue: if you kick a player in the "playerConnect" event, they get a crash/timeout
// So I'm fixing it by triggering "playerConnect" with a little bit of delay

const playerTimeoutIds = new Map<number, NodeJS.Timeout>()

nativeEvents.onPlayerConnect((playerId) => {
    sampNatives.togglePlayerSpectating(playerId, true) // TODO: remove this when the issue is fixed

    const timeoutId = setTimeout(() => {
        playerTimeoutIds.delete(playerId)

        const player = playerFactory.new(playerId)

        if (player) {
            dispatcher.emit("playerConnect", player)
        }
    }, 1000)

    playerTimeoutIds.set(playerId, timeoutId)
})

nativeEvents.onPlayerDisconnect((playerId, reason) => {
    clearTimeout(playerTimeoutIds.get(playerId))
    playerTimeoutIds.delete(playerId)

    const player = playerFactory.at(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, reason)
        playerFactory.destroy(player)
    }
})
