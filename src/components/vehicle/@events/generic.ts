import { dispatcher } from "@/core/dispatcher"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/components/player"

// "OnVehicleSpawn" is a misleading name because it's called only when the vehicle RESPAWNS
samp.on("OnVehicleSpawn", (vehicleId) => {
    const vehicle = vehicleHandler.atSampId(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()

        dispatcher.emit("vehicleRespawn", vehicle)
    }
})

samp.on("OnVehicleDeath", (vehicleId, closestPlayerId) => {
    const vehicle = vehicleHandler.atSampId(vehicleId)
    const closestPlayer = playerHandler.atSampId(closestPlayerId)

    if (vehicle) {
        dispatcher.emit("vehicleDeath", vehicle, closestPlayer)
    }
})