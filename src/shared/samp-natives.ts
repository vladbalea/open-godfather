import {
    WeaponEnum,
    PlayerStateEnum,
    DialogStyleEnum,
    WeaponSkillEnum,
    SpecialActionEnum,
    VehicleSeatEnum,
} from "./enums"
import { WorldPosition } from "./types"

declare class samp {
    static on(eventName: string, func: Function): any
    static callNative(nativeName: string, paramTypes: string, ...args: any[]): any
    static callNativeFloat(nativeName: string, paramTypes: string, ...args: any[]): number
}

export default class SampNatives {
    static on(eventName: string, func: Function) {
        samp.on(eventName, func)
    }
    
    static callNative(nativeName: string, paramTypes: string, ...args: any[]) {
        return samp.callNative(nativeName, paramTypes, ...args)
    }
    
    static callNativeFloat(nativeName: string, paramTypes: string, ...args: any[]) {
        return samp.callNativeFloat(nativeName, paramTypes, ...args)
    }

    static getServerTickRate = (): number => {
        return samp.callNative('GetServerTickRate', '');
    }

    static getVehicleVelocity = (vehicleid: number) => {
        if (!SampNatives.isValidVehicle(vehicleid)) {
            return {
                x: 0,
                y: 0,
                z: 0
            }
        }
        const res = samp.callNative('GetVehicleVelocity', 'iFFF', vehicleid);
        return {
            x: res[0],
            y: res[1],
            z: res[2],
        }
    }

    static getWeaponName = (weaponid: WeaponEnum): string => {
        if (weaponid < WeaponEnum.FIST || weaponid > WeaponEnum.COLLISION) {
            return "invalid_weapon"
        }
        return samp.callNative('GetWeaponName', 'iSi', weaponid, 32);
    }
    
    static setVehicleVelocity = (vehicleid: number, X: number, Y: number, Z: number) => {
        return samp.callNative('SetVehicleVelocity', 'ifff', vehicleid, X, Y, Z) === 1
    }

    static setPlayerSkillLevel = (playerId: number, skillType: WeaponSkillEnum, level: number): boolean => {
        return samp.callNative('SetPlayerSkillLevel', 'iii', playerId, skillType, level) === 1
    }

    static setPlayerColor = (playerId: number, color: string): void => {
        samp.callNative('SetPlayerColor', 'ii', playerId, parseInt(color + "FF", 16))
    }

    static setWeather = (weatherId: number): void => {
        samp.callNative('SetWeather', 'i', weatherId);
    }

    static setWorldTime = (hour: number): void => {
        samp.callNative('SetWorldTime', 'i', hour);
    }

    static setNameTagDrawDistance = (distance: number): void => {
        samp.callNative('SetNameTagDrawDistance', 'f', distance);
    }

    static enableStuntBonusForAll = (enable: boolean): void => {
        samp.callNative('EnableStuntBonusForAll', 'i', enable === true ? 1 : 0);
    }

    static sendRconCommand = (command: string): void => {
        samp.callNative('SendRconCommand', 's', command)
    }

    static changeVehicleColor = (vehicleId: number, color1: number, color2: number): boolean => {
        return samp.callNative('ChangeVehicleColor', 'iii', vehicleId, color1, color2) === 1
    }

    static destroyVehicle = (vehicleId: number): boolean => {
        return samp.callNative('DestroyVehicle', 'i', vehicleId) === 1
    }

    static createVehicle = (modelId: number, position: WorldPosition, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false): number | undefined => {
        const vehicleId = samp.callNative('CreateVehicle', 'iffffiiii', modelId, position.x, position.y, position.z, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === 65535 || vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    static showPlayerDialog = (playerId: number, dialogId: number, styleId: DialogStyleEnum, caption: string, info: string, button1: string, button2: string): boolean => {
        return samp.callNative('ShowPlayerDialog', 'iiissss', playerId, dialogId, styleId, caption, info, button1, button2) === 1
    }

    static setPlayerName(playerId: number, name: string): boolean {
        return samp.callNative("SetPlayerName", "is", playerId, name) === 1
    }

    static setPlayerInterior(playerId: number, interior: number): boolean {
        return samp.callNative("SetPlayerInterior", "ii", playerId, interior) === 1
    }
    
    static getPlayerInterior(playerId: number): number {
        return samp.callNative("GetPlayerInterior", "i", playerId)
    }
    
    static setPlayerVirtualWorld(playerId: number, world: number): boolean {
        return samp.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1
    }
    
    static getPlayerVirtualWorld(playerId: number): number {
        return samp.callNative("GetPlayerVirtualWorld", "i", playerId)
    }
    
    static setSpawnInfo(playerId: number, teamId: number, skinId: number, position: WorldPosition, rotation: number, weapons: { weapon: WeaponEnum, ammo: number }[] = []): void {
        const weapon1 = weapons[0] ? weapons[0].weapon : WeaponEnum.FIST
        const weapon1ammo = weapons[0] ? weapons[0].ammo : 0
        const weapon2 = weapons[1] ? weapons[1].weapon : WeaponEnum.FIST
        const weapon2ammo = weapons[1] ? weapons[1].ammo : 0
        const weapon3 = weapons[2] ? weapons[2].weapon : WeaponEnum.FIST
        const weapon3ammo = weapons[2] ? weapons[2].ammo : 0
        samp.callNative("SetSpawnInfo", "iiiffffiiiiii", playerId, teamId, skinId, position.x, position.y, position.z, rotation, weapon1, weapon1ammo, weapon2, weapon2ammo, weapon3, weapon3ammo)
    }
    
    static kick(playerId: number): void {
        samp.callNative("Kick", "i", playerId)
    }
    
    static spawnPlayer(playerId: number): boolean {
        return samp.callNative("SpawnPlayer", "i", playerId) === 1
    }
    
    static togglePlayerSpectating(playerId: number, toggle: boolean): boolean {
        return samp.callNative("TogglePlayerSpectating", "ii", playerId, toggle === true ? 1 : 0) === 1
    }
    
    static sendClientMessage(playerId: number, color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), message)
        }
    }

    static setPlayerScore = (playerId: number, score: number): boolean => {
        return samp.callNative('SetPlayerScore', 'ii', playerId, score) === 1
    }
    
    static getPlayerScore = (playerId: number): number => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative('GetPlayerScore', 'i', playerId);
    }

    static isPlayerInRangeOfPoint = (playerId: number, range: number, x: number, y: number, z: number): boolean => {
        return samp.callNative('IsPlayerInRangeOfPoint', 'iffff', playerId, range, x, y, z) === 1
    }

    static setVehiclePosition = (vehicleId: number, x: number, y: number, z: number): boolean => {
        return samp.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1
    }

    static applyAnimation = (playerid: number, animlib: string, animname: string, fDelta: number, loop: boolean, lockx: boolean, locky: boolean, freeze: boolean, time: number, forcesync: boolean): void => {
        samp.callNative('ApplyAnimation', 'issfiiiiii', playerid, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync);
    }
    
    static clearAnimations = (playerid: number, forcesync: boolean): void => {
        samp.callNative('ClearAnimations', 'ii', playerid, forcesync);
    }
    
    static getPlayerAnimationIndex = (playerid: number): number => {
        return samp.callNative('GetPlayerAnimationIndex', 'i', playerid);
    }
    
    static getAnimationName = (index: number): { library: string, name: string} | undefined => {
        const res = samp.callNative('GetAnimationName', 'iSiSi', index, 32, 32);
        if (res.length < 2) {
            return undefined
        }
        return {
            library: res[0],
            name: res[1],
        }
    }

    static getPlayerVehicleSeat = (playerid: number): VehicleSeatEnum | undefined => {
        const res = samp.callNative('GetPlayerVehicleSeat', 'i', playerid);
        if (res === -1) {
            return undefined
        }
        return res
    }
    
    static getPlayerSpecialAction = (playerid: number): SpecialActionEnum => {
        return samp.callNative('GetPlayerSpecialAction', 'i', playerid);
    }
    
    static setPlayerSpecialAction = (playerid: number, actionid: SpecialActionEnum): boolean => {
        return samp.callNative('SetPlayerSpecialAction', 'ii', playerid, actionid);
    }

    static gpci = (playerId: number): string => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "invalid_gpci"
        }
        return samp.callNative('gpci', 'iSi', playerId, 61);
    }
    
    static getPlayerName(playerId: number): string {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "invalid_name"
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24)
    }

    static getPlayerIp = (playerId: number): string => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "255.255.255.255"
        }
        return samp.callNative('GetPlayerIp', 'iSi', playerId, 17)
    }

    static getPlayerPing = (playerId: number): number => {
        return samp.callNative('GetPlayerPing', 'i', playerId);
    }

    static givePlayerMoney = (playerId: number, money: number): boolean => {
        return samp.callNative('GivePlayerMoney', 'ii', playerId, money) === 1
    }

    static resetPlayerMoney = (playerId: number): boolean => {
        return samp.callNative('ResetPlayerMoney', 'i', playerId) === 1
    }

    static givePlayerWeapon = (playerId: number, weaponId: WeaponEnum, ammo: number): boolean => {
        return samp.callNative('GivePlayerWeapon', 'iii', playerId, weaponId, ammo) === 1
    }

    static getPlayerWeapon = (playerId: number): WeaponEnum => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return WeaponEnum.FIST
        }
        return samp.callNative('GetPlayerWeapon', 'i', playerId);
    }

    static setPlayerArmedWeapon = (playerId: number, weaponId: WeaponEnum) => {
        return samp.callNative('SetPlayerArmedWeapon', 'ii', playerId, weaponId) === 1
    }

    static setPlayerSkin = (playerId: number, skinId: number): boolean => {
        return samp.callNative('SetPlayerSkin', 'ii', playerId, skinId) === 1
    }
    
    static isPlayerConnected(playerId: number): boolean {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1
    }
    
    static getPlayerPosition(playerId: number): WorldPosition {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return {
                x: 0,
                y: 0,
                z: 3,
            }
        }
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId)
        return {
            x: pos[0],
            y: pos[1],
            z: pos[2],
        }
    }

    static getVehiclePosition = (vehicleId: number): WorldPosition => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return {
                x: 0,
                y: 0,
                z: 3,
            }
        }
        const pos = samp.callNative('GetVehiclePos', 'iFFF', vehicleId);
        return {
            x: pos[0],
            y: pos[1],
            z: pos[2],
        }
    }
    
    static setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }
    
    static setPlayerHealth(playerId: number, health: number): boolean {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }
    
    static getPlayerHealth(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 100
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId)
    }
    
    static setPlayerArmour(playerId: number, armour: number): boolean {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }
    
    static getPlayerArmour(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId)
    }
    
    static putPlayerInVehicle(playerId: number, vehicleId: number, seat = VehicleSeatEnum.DRIVER): boolean {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1
    }
    
    static getPlayerVehicleId(playerId: number): number | undefined {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId)
    
        if (vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }
    
    static getPlayerState(playerId: number): PlayerStateEnum | undefined {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return undefined
        }
        return samp.callNative("GetPlayerState", "i", playerId)
    }
    
    static setPlayerRotation(playerId: number, rotation: number) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1
    }
    
    static getPlayerRotation(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId)
    }

    static setVehicleZAngle = (vehicleId: number, angle: number) => {
        return samp.callNative('SetVehicleZAngle', 'if', vehicleId, angle) === 1
    }

    static getVehicleZAngle = (vehicleId: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative('GetVehicleZAngle', 'iF', vehicleId);
    }

    static setVehicleVirtualWorld = (vehicleId: number, worldId: number) => {
        return samp.callNative('SetVehicleVirtualWorld', 'ii', vehicleId, worldId) === 1
    }
    
    static getVehicleVirtualWorld = (vehicleId: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative('GetVehicleVirtualWorld', 'i', vehicleId);
    }

    static linkVehicleToInterior = (vehicleId: number, interiorId: number): boolean => {
        return samp.callNative('LinkVehicleToInterior', 'ii', vehicleId, interiorId) === 1
    }

    static getVehicleDistanceFromPoint = (vehicleId: number, x: number, y: number, z: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat('GetVehicleDistanceFromPoint', 'ifff', vehicleId, x, y, z);
    }
    
    static getPlayerDistanceFromPoint = (playerId: number, x: number, y: number, z: number): number => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat('GetPlayerDistanceFromPoint', 'ifff', playerId, x, y, z)
    }
    
    static sendClientMessageToAll(color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), message)
        }
    }
    
    static setPlayerChatBubble = (playerId: number, text: string, color: string, drawdistance: number, expiretime: number): boolean => {
        return samp.callNative('SetPlayerChatBubble', 'isifi', playerId, text, parseInt(color + "FF", 16), drawdistance, expiretime) === 1
    }
    
    static getVehicleModel(vehicleId: number): number | undefined {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId)
        if (modelId === 0) {
            return undefined
        }
        return modelId
    }
    
    static getVehicleHealth(vehicleId: number): number {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 1000
        }
        return samp.callNative("GetVehicleHealth", "iF", vehicleId)
    }
    
    static setVehicleHealth(vehicleId: number, health: number): boolean {
        return samp.callNative("SetVehicleHealth", "if", vehicleId, health) === 1
    }
    
    static isValidVehicle(vehicleId: number): boolean {
        return samp.callNative("IsValidVehicle", "i", vehicleId) === 1
    }
}