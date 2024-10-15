import { type Player } from ".."
import { nativeFunctions } from "@/wrapper"
import { PlayerStatesEnum, type VehicleSeatsEnum } from "@/utils/enums"
import { type Vehicle, vehicleHandler } from "../../vehicle"
import { dispatcher } from "@/core/dispatcher"

const lastVehicleReferenceId = new WeakMap<Player, number>()

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    if (
        // Check if a player is in a vehicle and was not in a vehicle before
        (newState === PlayerStatesEnum.Passenger || newState === PlayerStatesEnum.Driver) &&
        oldState !== PlayerStatesEnum.Passenger &&
        oldState !== PlayerStatesEnum.Driver
    ) {
        const currentVehicle = player.vehicle

        if (!currentVehicle) {
            return
        }

        lastVehicleReferenceId.set(player, currentVehicle.referenceId)
        dispatcher.emit("playerEnterVehicle", player, currentVehicle)
    } else if (
        // Check if a player is not in a vehicle and was in a vehicle before
        (oldState === PlayerStatesEnum.Passenger || oldState === PlayerStatesEnum.Driver) &&
        newState !== PlayerStatesEnum.Passenger &&
        newState !== PlayerStatesEnum.Driver
    ) {
        const lastVehicleRefId = lastVehicleReferenceId.get(player)

        if (lastVehicleRefId === undefined) {
            return
        }

        lastVehicleReferenceId.delete(player)
        dispatcher.emit("playerExitVehicle", player, vehicleHandler.atReferenceId(lastVehicleRefId))
    }
})

export function putInVehicleWithEvent(player: Player, vehicle: Vehicle, seat: VehicleSeatsEnum) {
    const oldVehicle = player.vehicle

    if (!oldVehicle || oldVehicle === vehicle) {
        return nativeFunctions.putPlayerInVehicle(player.sampId, vehicle.sampId, seat)
    }

    dispatcher.emit("playerExitVehicle", player, oldVehicle)

    nativeFunctions.putPlayerInVehicle(player.sampId, vehicle.sampId, seat)

    dispatcher.emit("playerEnterVehicle", player, vehicle)

    return true
}