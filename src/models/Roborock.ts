import * as Miio from "miio";
import { VacuumMode } from "./VacuumMode";
import { RoborockStatus } from "./RoborockStatus";

export class Roborock {

    constructor(device: Miio.Device) {
        this.device = device;
    }

    setMode(mode: VacuumMode): Promise<any> {
        return this.device.call("set_custom_mode", [mode]);
    }

    async getStatus(): Promise<RoborockStatus> {
        const result = await this.device.call("get_status", []);
        return new RoborockStatus(result[0]);
    }

    private device: Miio.Device;
}