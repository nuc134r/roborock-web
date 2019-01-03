import * as Miio from "miio";
import { VacuumMode } from "./common/VacuumMode";
import { RoborockStatus } from "./common/RoborockStatus";

export class Roborock {

    constructor(device: Miio.Device) {
        this.device = device;
    }

    async getStatus(): Promise<RoborockStatus> {
        const result = await this.device.call("get_status", []);
        return new RoborockStatus(result[0]);
    }

    findMe(): Promise<any> {
        return this.device.call("find_me", []);
    }

    setMode(mode: VacuumMode): Promise<any> {
        return this.device.call("set_custom_mode", [mode]);
    }

    startCleanup(): Promise<any> {
        return this.device.call("app_start", []);
    }

    pauseCleanup(): Promise<any> {
        return this.device.call("app_pause", []);
    }

    goToTheDock(): Promise<any> {
        return this.device.call("app_charge", []);
    }

    private device: Miio.Device;
}