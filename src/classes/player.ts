import { Natives } from "../scripting-api"
import {
    WeaponEnum,
    DialogStyleEnum,
    PlayerStateEnum,
    Vehicle,
    Vehicles,
    WeaponSkillEnum,
    EntityPosition,
    SpecialActionEnum,
    VehicleSeatEnum,
} from ".."
import { showPlayerDialog, hidePlayerDialog } from "../features/dialog"
import { godfather_putPlayerInVehicle } from "../features/callbacks/enter-exit-car"

export class Player {
    #id: number
    exists = true
    #color: string
    spawnCount: number
    #cash: number
    #skin: number

    constructor(playerId: number) {
        this.#id = playerId
        this.#color = "FFFFFF"
        this.spawnCount = 0
        this.#cash = 0
        this.#skin = 0
    }

    get id() {
        return this.#id
    }

    sendMessage(message: string, color = "FFFFFF") {
        return Natives.sendClientMessage(this.#id, color, message)
    }

    spamMessage(message: string, count = 30, color = "FFFFFF") {
        for (let i = 0; i < count; i++) {
            this.sendMessage(message, color)
        }
    }

    spawn() {
        return Natives.spawnPlayer(this.#id)
    }

    kick(delay = true) {
        if (!delay) {
            return Natives.kick(this.#id)
        }
        setTimeout(() => {
            Natives.kick(this.#id)
        }, 10)
    }

    setSpawnInfo(teamId: number, skinId: number, position: EntityPosition, rotation: number, weapons: { weapon: WeaponEnum, ammo: number }[] = []) {
        this.#skin = skinId
        return Natives.setSpawnInfo(this.#id, teamId, skinId, position, rotation, weapons)
    }

    showDialog(styleId: DialogStyleEnum, caption: string, info: string, primaryButton: string, secondaryButton: string = "", callback?: (response: boolean, listItem: number, inputText: string) => void) {
        return showPlayerDialog(this.#id, styleId, caption, info, primaryButton, secondaryButton, callback)
    }

    hideDialog() {
        return hidePlayerDialog(this.#id)
    }

    putIntoVehicle(vehicle: Vehicle, seat = VehicleSeatEnum.DRIVER) {
        return godfather_putPlayerInVehicle(this.#id, vehicle.id, seat)
    }

    setSpectating(spectating: boolean) {
        return Natives.togglePlayerSpectating(this.#id, spectating)
    }

    setPosition(position: EntityPosition) {
        return Natives.setPlayerPosition(this.#id, position.x, position.y, position.z)
    }

    getPosition() {
        return Natives.getPlayerPosition(this.#id)
    }

    getDistance(position: EntityPosition, world?: number, interior?: number) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return Natives.getPlayerDistanceFromPoint(this.#id, position.x, position.y, position.z)
    }

    setChatBubble(text: string, color = "FFFFFF", drawDistance = 12, expireTime = 5000) {
        return Natives.setPlayerChatBubble(this.#id, text, color, drawDistance, expireTime)
    }

    setWeaponSkill(weapon: WeaponSkillEnum, level: number) {
        return Natives.setPlayerSkillLevel(this.#id, weapon, level)
    }

    giveWeapon(weapon: WeaponEnum, ammo: number) {
        return Natives.givePlayerWeapon(this.#id, weapon, ammo)
    }

    setTimeout(delay: number, callback: () => void) {
        return setTimeout(() => {
            if (this.exists) {
                callback()
            }
        }, delay)
    }

    setInterval(delay: number, callback: () => void) {
        const intervalId = setInterval(() => {
            if (this.exists) {
                callback()
            } else {
                clearInterval(intervalId)
            }
        }, delay)
        return intervalId
    }

    applyAnimation(library: string, name: string, speed: number, loop: boolean, lockX: boolean, lockY: boolean, freeze: boolean, time: number, forceSync = true) {
        return Natives.applyAnimation(this.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clearAnimations() {
        return Natives.clearAnimations(this.id, true)
    }

    set skin(skinId: number) {
        this.#skin = skinId
        Natives.setPlayerSkin(this.#id, skinId)
    }

    get skin() {
        return this.#skin
    }

    set holdingWeapon(weaponId: WeaponEnum) {
        Natives.setPlayerArmedWeapon(this.#id, weaponId)
    }

    get holdingWeapon() {
        return Natives.getPlayerWeapon(this.#id)
    }

    set rotation(rotation: number) {
        Natives.setPlayerRotation(this.#id, rotation)
    }

    get rotation() {
        return Natives.getPlayerRotation(this.#id)
    }

    get isSpawned() {
        const state = Natives.getPlayerState(this.#id)
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStateEnum.WASTED && state !== PlayerStateEnum.SPECTATING && state !== PlayerStateEnum.NONE as PlayerStateEnum
    }

    get state(): PlayerStateEnum | undefined {
        return Natives.getPlayerState(this.#id)
    }

    set name(value: string) {
        Natives.setPlayerName(this.#id, value)
    }

    get name() {
        return Natives.getPlayerName(this.#id)
    }
    
    set world(value: number) {
        Natives.setPlayerVirtualWorld(this.#id, value)
    }

    get world() {
        return Natives.getPlayerVirtualWorld(this.#id)
    }

    set interior(value: number) {
        Natives.setPlayerInterior(this.#id, value)
    }

    get interior() {
        return Natives.getPlayerInterior(this.#id)
    }

    set health(value: number) {
        Natives.setPlayerHealth(this.#id, value)
    }

    get health() {
        return Natives.getPlayerHealth(this.#id)
    }

    set armour(value: number) {
        Natives.setPlayerArmour(this.#id, value)
    }

    get armour() {
        return Natives.getPlayerArmour(this.#id)
    }

    set color(hex: string) {
        this.#color = hex
        Natives.setPlayerColor(this.#id, hex)
    }

    get color() {
        return this.#color
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = Natives.getPlayerVehicleId(this.#id)
        if (vehicleId === undefined) {
            return undefined
        }
        return Vehicles.at(vehicleId)
    }

    get ip() {
        return Natives.getPlayerIp(this.#id)
    }

    get ping() {
        return Natives.getPlayerPing(this.#id)
    }

    get gpci() {
        return Natives.gpci(this.#id)
    }

    set cash(value: number) {
        Natives.resetPlayerMoney(this.#id)
        Natives.givePlayerMoney(this.#id, value)

        this.#cash = value
    }

    get cash() {
        return this.#cash
    }

    set score(value: number) {
        Natives.setPlayerScore(this.#id, value)
    }

    get score() {
        return Natives.getPlayerScore(this.#id)
    }

    get animation() {
        return Natives.getPlayerAnimationIndex(this.id)
    }

    set specialAction(action: SpecialActionEnum) {
        Natives.setPlayerSpecialAction(this.id, action)
    }

    get specialAction() {
        return Natives.getPlayerSpecialAction(this.id)
    }

    get vehicleSeat() {
        return Natives.getPlayerVehicleSeat(this.id)
    }
}