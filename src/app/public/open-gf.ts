import { OpenCommands } from "../domain/commands"
import { OpenEvents } from "../domain/events"
import { OpenPlayers } from "../domain/players"
import { SampServer } from "../domain/server"
import { OpenConfig } from "./types"
import { OpenVehicles } from "../domain/vehicles"

export class OpenGf {
    readonly server: SampServer
    readonly events: OpenEvents
    readonly players: OpenPlayers
    readonly vehicles: OpenVehicles
    readonly commands: OpenCommands

    constructor(config?: Partial<OpenConfig>) {
        this.server = new SampServer(config)
        this.events = new OpenEvents()
        this.players = new OpenPlayers()
        this.vehicles = new OpenVehicles()
        this.commands = new OpenCommands()
    }
}