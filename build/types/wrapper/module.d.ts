import { WeaponsEnum, PlayerStatesEnum, DialogStylesEnum, WeaponSkillsEnum, SpecialActionsEnum, VehicleSeatsEnum, CameraModesEnum, WeaponSlotsEnum } from "../shared/enums";
import { Vector3 } from "../modules/vector3";
export declare class SampNatives {
    static manualVehicleEngineAndLights: () => number;
    static setVehicleParamsEx: (vehicleId: number, engine: boolean, lights: boolean, alarm: boolean, doors: boolean, bonnet: boolean, boot: boolean, objective: boolean) => boolean;
    static setVehicleNumberPlate: (vehicleId: number, numberplate: string) => boolean;
    static getVehicleParamsEx: (vehicleId: number) => {
        engine: boolean;
        lights: boolean;
        alarm: boolean;
        doors: boolean;
        bonnet: boolean;
        boot: boolean;
        objective: boolean;
    };
    static getServerTickRate: () => number;
    static getVehicleVelocity: (vehicleId: number) => Vector3;
    static getWeaponName: (weaponId: WeaponsEnum) => string;
    static setVehicleVelocity: (vehicleId: number, velocity: Vector3) => boolean;
    static setPlayerSkillLevel: (playerId: number, skillType: WeaponSkillsEnum, level: number) => boolean;
    static setPlayerColor: (playerId: number, color: string) => void;
    static setWeather: (weatherId: number) => void;
    static setWorldTime: (hour: number) => void;
    static setNameTagDrawDistance: (distance: number) => void;
    static enableStuntBonusForAll: (enable: boolean) => void;
    static sendRconCommand: (command: string) => void;
    static changeVehicleColor: (vehicleId: number, color1: number, color2: number) => boolean;
    static destroyVehicle: (vehicleId: number) => boolean;
    static createVehicle: (modelId: number, position: Vector3, rotation: number, primaryColor?: number, secondaryColor?: number, respawnDelay?: number, addSiren?: boolean) => number | undefined;
    static showPlayerDialog: (playerId: number, dialogId: number, styleId: DialogStylesEnum, caption: string, info: string, button1: string, button2: string) => boolean;
    static hidePlayerDialog(playerId: number): void;
    static setPlayerName(playerId: number, name: string): boolean;
    static setPlayerInterior(playerId: number, interior: number): boolean;
    static getPlayerInterior(playerId: number): number;
    static setPlayerVirtualWorld(playerId: number, world: number): boolean;
    static getPlayerVirtualWorld(playerId: number): number;
    static setPlayerTeam: (playerId: number, teamId: number) => boolean;
    static create3DTextLabel: (text: string, color: string, X: number, Y: number, Z: number, DrawDistance: number, virtualworld: number, testLOS: boolean) => number | undefined;
    static delete3DTextLabel: (id: number) => boolean;
    static attach3DTextLabelToPlayer: (id: number, playerId: number, OffsetX: number, OffsetY: number, OffsetZ: number) => boolean;
    static attach3DTextLabelToVehicle: (id: number, vehicleId: number, OffsetX: number, OffsetY: number, OffsetZ: number) => boolean;
    static update3DTextLabelText: (id: number, color: string, text: string) => boolean;
    static setSpawnInfo(playerId: number, team: number, skinId: number, position: Vector3, rotation: number, weapons?: {
        weapon: WeaponsEnum;
        ammo: number;
    }[]): void;
    static kick(playerId: number): void;
    static spawnPlayer(playerId: number): boolean;
    static togglePlayerSpectating(playerId: number, toggle: boolean): boolean;
    static sendClientMessage(playerId: number, color: string, message: string): void;
    static setPlayerScore: (playerId: number, score: number) => boolean;
    static getPlayerScore: (playerId: number) => number;
    static isPlayerInRangeOfPoint: (playerId: number, range: number, x: number, y: number, z: number) => boolean;
    static setVehiclePosition: (vehicleId: number, x: number, y: number, z: number) => boolean;
    static applyAnimation: (playerId: number, animlib: string, animname: string, fDelta: number, loop: boolean, lockx: boolean, locky: boolean, freeze: boolean, time: number, forcesync: boolean) => void;
    static clearAnimations: (playerId: number, forcesync: boolean) => void;
    static getPlayerAnimationIndex: (playerId: number) => number;
    static getAnimationName: (index: number) => {
        library: string;
        name: string;
    } | undefined;
    static getPlayerVehicleSeat: (playerId: number) => VehicleSeatsEnum | undefined;
    static getPlayerSpecialAction: (playerId: number) => SpecialActionsEnum;
    static setPlayerSpecialAction: (playerId: number, actionId: SpecialActionsEnum) => boolean;
    static gpci: (playerId: number) => string;
    static getPlayerName(playerId: number): string;
    static getPlayerIp: (playerId: number) => string;
    static getPlayerPing: (playerId: number) => number;
    static givePlayerMoney: (playerId: number, money: number) => boolean;
    static resetPlayerMoney: (playerId: number) => boolean;
    static givePlayerWeapon: (playerId: number, weaponId: WeaponsEnum, ammo: number) => boolean;
    static getPlayerWeapon: (playerId: number) => WeaponsEnum;
    static resetPlayerWeapons: (playerId: number) => boolean;
    static setPlayerArmedWeapon: (playerId: number, weaponId: WeaponsEnum) => boolean;
    static setPlayerSkin: (playerId: number, skinId: number) => boolean;
    static isPlayerConnected(playerId: number): boolean;
    static getPlayerPosition(playerId: number): Vector3;
    static getVehiclePosition: (vehicleId: number) => Vector3;
    static setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean;
    static setPlayerHealth(playerId: number, health: number): boolean;
    static getPlayerHealth(playerId: number): number;
    static setPlayerArmour(playerId: number, armour: number): boolean;
    static getPlayerArmour(playerId: number): number;
    static putPlayerInVehicle(playerId: number, vehicleId: number, seat?: VehicleSeatsEnum): boolean;
    static getPlayerWeaponData: (playerId: number, slot: WeaponSlotsEnum) => {
        model: WeaponsEnum;
        ammo: number;
    } | undefined;
    static getPlayerVehicleId(playerId: number): number | undefined;
    static getPlayerCameraMode: (playerId: number) => CameraModesEnum;
    static getPlayerState(playerId: number): PlayerStatesEnum | undefined;
    static setPlayerRotation(playerId: number, rotation: number): boolean;
    static getPlayerRotation(playerId: number): number;
    static setVehicleZAngle: (vehicleId: number, angle: number) => boolean;
    static getVehicleZAngle: (vehicleId: number) => number;
    static setVehicleVirtualWorld: (vehicleId: number, worldId: number) => boolean;
    static getVehicleVirtualWorld: (vehicleId: number) => number;
    static linkVehicleToInterior: (vehicleId: number, interiorId: number) => boolean;
    static getVehicleDistanceFromPoint: (vehicleId: number, x: number, y: number, z: number) => number;
    static getPlayerDistanceFromPoint: (playerId: number, x: number, y: number, z: number) => number;
    static sendClientMessageToAll(color: string, message: string): void;
    static setPlayerChatBubble: (playerId: number, text: string, color: string, drawdistance: number, expiretime: number) => boolean;
    static getVehicleModel(vehicleId: number): number | undefined;
    static getVehicleHealth(vehicleId: number): number;
    static setVehicleHealth(vehicleId: number, health: number): boolean;
    static isValidVehicle(vehicleId: number): boolean;
}
