import "./modules/server/@controllers";
import "./modules/player/@controllers";
import "./modules/vehicle/@controllers";
import "./modules/commands/@controllers";
export { ServerMp } from "./modules/server";
export { PlayerMp } from "./modules/player";
export { VehicleMp } from "./modules/vehicle";
export { Vector3 } from "./modules/vector3";
export { CommandMp } from "./modules/commands";
export { TextLabelMp } from "./modules/text-label";
export * from "./shared/enums";
import { Vector3 as Vector3Mp } from "./modules/vector3";
export declare namespace og {
    const events: import("./modules/events").EventBus;
    const server: import("./modules/server").ServerMp;
    const players: import("./modules/player").PlayersMp;
    const vehicles: import("./modules/vehicle").VehiclesMp;
    const commands: import("./modules/commands").CommandsMp;
    const textLabels: import("./modules/text-label").TextLabelsMp;
    const Vector3: typeof Vector3Mp;
}
