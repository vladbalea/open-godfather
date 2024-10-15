import type { TextDrawFontsEnum, TextDrawAlignmentsEnum } from "@/utils/enums"
import { type Vector3 } from "../../core/vector3"
import { nativeFunctions } from "@/wrapper"
import { playerHandler, type Player } from "../player"
import { SampEntity } from "@/core/samp-entity"

const INVALID_TEXTDRAW_ID = 0xffff

export class Textdraw extends SampEntity {
    private toRemoveFromSetOnCleanup = new WeakSet<Player>()
    private showingForPlayers = new Set<Player>()

    private _position: { x: number; y: number }
    private _text: string
    private _textColor?: string
    private _boxColor?: string
    private _backgroundColor?: string
    private _alignment?: TextDrawAlignmentsEnum
    private _font?: TextDrawFontsEnum
    private _letterSize?: { width: number; height: number }
    private _textSize?: { width: number; height: number }
    private _outlineSize?: number
    private _shadowSize?: number
    private _proportional?: boolean
    private _useBox?: boolean
    private _selectable?: boolean
    private _previewModel?: number
    private _previewRotation?: { rotation: Vector3; zoom: number }
    private _previewVehicleColor?: { primary: number; secondary: number }

    constructor(
        sampId: number,
        position: { x: number; y: number },
        text: string,
        textColor?: string,
        boxColor?: string,
        backgroundColor?: string,
        alignment?: TextDrawAlignmentsEnum,
        font?: TextDrawFontsEnum,
        letterSize?: { width: number; height: number },
        textSize?: { width: number; height: number },
        outlineSize?: number,
        shadowSize?: number,
        proportional?: boolean,
        useBox?: boolean,
        selectable?: boolean,
        previewModel?: number,
        previewRotation?: { rotation: Vector3; zoom: number },
        previewVehicleColor?: { primary: number; secondary: number },
    ) {
        super(sampId, INVALID_TEXTDRAW_ID)

        this._textColor = textColor
        this._boxColor = boxColor
        this._backgroundColor = backgroundColor
        this._alignment = alignment
        this._font = font
        this._letterSize = letterSize
        this._textSize = textSize
        this._outlineSize = outlineSize
        this._shadowSize = shadowSize
        this._proportional = proportional
        this._useBox = useBox
        this._text = text
        this._position = position
        this._selectable = selectable
        this._previewModel = previewModel
        this._previewRotation = previewRotation
        this._previewVehicleColor = previewVehicleColor
    }

    private reshowForAllPlayers() {
        for (const player of this.showingForPlayers) {
            nativeFunctions.textDrawShowForPlayer(player.sampId, this.sampId)
        }
    }

    showForPlayer(player: Player) {
        nativeFunctions.textDrawShowForPlayer(player.sampId, this.sampId)
        this.showingForPlayers.add(player)

        if (!this.toRemoveFromSetOnCleanup.has(player)) {
            player.onCleanup(() => {
                this.showingForPlayers.delete(player)
            })

            this.toRemoveFromSetOnCleanup.add(player)
        }
    }

    hideForPlayer(player: Player) {
        nativeFunctions.textDrawHideForPlayer(player.sampId, this.sampId)
        this.showingForPlayers.delete(player)
    }

    isShowingForPlayer(player: Player) {
        return this.showingForPlayers.has(player)
    }

    showForAllPlayers() {
        nativeFunctions.textDrawShowForAll(this.sampId)

        const players = playerHandler.all

        for (const player of players) {
            this.showingForPlayers.add(player)

            if (!this.toRemoveFromSetOnCleanup.has(player)) {
                player.onCleanup(() => {
                    this.showingForPlayers.delete(player)
                })

                this.toRemoveFromSetOnCleanup.add(player)
            }
        }
    }

    hideForAllPlayers() {
        nativeFunctions.textDrawHideForAll(this.sampId)
        this.showingForPlayers.clear()
    }

    setLetterSize(width: number, height: number) {
        this._letterSize = { width, height }
        nativeFunctions.textDrawLetterSize(this.sampId, width, height)
        this.reshowForAllPlayers()
    }

    getLetterSize() {
        return this._letterSize
    }

    setTextSize(width: number, height: number) {
        this._textSize = { width, height }
        nativeFunctions.textDrawTextSize(this.sampId, width, height)
        this.reshowForAllPlayers()
    }

    getTextSize() {
        return this._textSize
    }

    set alignment(value: TextDrawAlignmentsEnum) {
        this._alignment = value
        nativeFunctions.textDrawAlignment(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get alignment(): TextDrawAlignmentsEnum | undefined {
        return this._alignment
    }

    set textColor(value: string) {
        this._textColor = value
        nativeFunctions.textDrawColor(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get textColor(): string | undefined {
        return this._textColor
    }

    set usingBox(value: boolean) {
        this._useBox = value
        nativeFunctions.textDrawUseBox(this.sampId, Number(value))
        this.reshowForAllPlayers()
    }

    get usingBox(): boolean | undefined {
        return this._useBox
    }

    set boxColor(value: string) {
        this._boxColor = value
        nativeFunctions.textDrawBoxColor(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get boxColor(): string | undefined {
        return this._boxColor
    }

    set shadowSize(value: number) {
        this._shadowSize = value
        nativeFunctions.textDrawSetShadow(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get shadowSize(): number | undefined {
        return this._shadowSize
    }

    set outlineSize(value: number) {
        this._outlineSize = value
        nativeFunctions.textDrawSetOutline(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get outlineSize(): number | undefined {
        return this._outlineSize
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value
        nativeFunctions.textDrawBackgroundColor(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get backgroundColor(): string | undefined {
        return this._backgroundColor
    }

    set font(value: TextDrawFontsEnum) {
        this._font = value
        nativeFunctions.textDrawFont(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get font(): TextDrawFontsEnum | undefined {
        return this._font
    }

    set proportional(value: boolean) {
        this._proportional = value
        nativeFunctions.textDrawSetProportional(this.sampId, Number(value))
        this.reshowForAllPlayers()
    }

    get proportional(): boolean | undefined {
        return this._proportional
    }

    set selectable(value: boolean) {
        this._selectable = value
        nativeFunctions.textDrawSetSelectable(this.sampId, Number(value))
        this.reshowForAllPlayers()
    }

    get selectable(): boolean | undefined {
        return this._selectable
    }

    set text(value: string) {
        this._text = value
        nativeFunctions.textDrawSetString(this.sampId, value)
    }

    get text() {
        return this._text
    }

    set previewModel(value: number) {
        this._previewModel = value
        nativeFunctions.textDrawSetPreviewModel(this.sampId, value)
        this.reshowForAllPlayers()
    }

    get previewModel(): number | undefined {
        return this._previewModel
    }

    setPreviewRotation(rotation: Vector3, zoom: number) {
        this._previewRotation = { rotation, zoom }
        nativeFunctions.textDrawSetPreviewRot(this.sampId, rotation.x, rotation.y, rotation.z, zoom)
        this.reshowForAllPlayers()
    }

    getPreviewRotation() {
        return this._previewRotation
    }

    setPreviewVehicleColor(primary: number, secondary: number) {
        this._previewVehicleColor = { primary, secondary }
        nativeFunctions.textDrawSetPreviewVehCol(this.sampId, primary, secondary)
        this.reshowForAllPlayers()
    }

    getPreviewVehicleColor() {
        return this._previewVehicleColor
    }

    setPosition(x: number, y: number) {
        this._position = { x, y }
        nativeFunctions.textDrawSetPos(this.sampId, x, y)
        this.reshowForAllPlayers()
    }

    getPosition() {
        return this._position
    }
}