class NativeEvents {
    onPlayerConnect(callback: (playerid: number) => void) {
        samp.on("OnPlayerConnect", callback)
    }

    onPlayerDisconnect(callback: (playerid: number, reason: number) => void) {
        samp.on("OnPlayerDisconnect", callback)
    }

    onPlayerSpawn(callback: (playerid: number) => void) {
        samp.on("OnPlayerSpawn", callback)
    }

    onPlayerDeath(callback: (playerid: number, killerid: number, reason: number) => void) {
        samp.on("OnPlayerDeath", callback)
    }

    onPlayerText(callback: (playerid: number, text: string) => void) {
        samp.on("OnPlayerText", callback)
    }

    onPlayerCommandText(callback: (playerid: number, cmdtext: string) => void) {
        samp.on("OnPlayerCommandText", callback)
    }

    onPlayerRequestClass(callback: (playerid: number, classid: number) => void) {
        samp.on("OnPlayerRequestClass", callback)
    }

    onPlayerEnterVehicle(callback: (playerid: number, vehicleid: number, ispassenger: boolean) => void) {
        samp.on("OnPlayerEnterVehicle", callback)
    }

    onPlayerExitVehicle(callback: (playerid: number, vehicleid: number) => void) {
        samp.on("OnPlayerExitVehicle", callback)
    }

    onPlayerStateChange(callback: (playerid: number, newstate: number, oldstate: number) => void) {
        samp.on("OnPlayerStateChange", callback)
    }

    onPlayerTakeDamage(callback: (playerid: number, issuerid: number, amount: number, weaponid: number, bodypart: number) => void) {
        samp.on("OnPlayerTakeDamage", callback)
    }

    onPlayerWeaponShot(
        callback: (playerid: number, weaponid: number, hittype: number, hitid: number, x: number, y: number, z: number) => void,
    ) {
        samp.on("OnPlayerWeaponShot", callback)
    }

    onDialogResponse(callback: (playerid: number, dialogId: number, response: boolean, listitem: number, inputText: string) => void) {
        samp.on("OnDialogResponse", callback)
    }

    onGameModeExit(callback: () => void) {
        samp.on("OnGameModeExit", callback)
    }

    onGameModeInit(callback: () => void) {
        samp.on("OnGameModeInit", callback)
    }
}

export const nativeEvents = new NativeEvents()
