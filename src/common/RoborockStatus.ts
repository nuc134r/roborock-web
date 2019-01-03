import { VacuumMode } from "./VacuumMode";
import { VacuumState } from "./VacuumState";
import { VacuumError } from "./VacuumError";


export interface RoborockStatusRaw {
    battery: number;
    clean_time: number;
    clean_area: number;
    state: number;
    error_code: number;
    in_cleaning: number;
    in_returning: number;
    in_fresh_state: number;
    fan_power: number;
    dnd_enabled: number;
}


export class RoborockStatus {

    constructor(raw: RoborockStatusRaw) {
        this.Battery = raw.battery;
        this.SessionCleaningTime = raw.clean_time;
        this.SessionCleaningArea = raw.clean_area;

        this.IsCleaning = raw.in_cleaning == 1;
        this.IsReturning = raw.in_returning == 1;
        this.IsDndEnabled = raw.dnd_enabled == 1;

        this.State = raw.state;
        this.Error = raw.error_code;

        switch (raw.fan_power) {
            case 38:
                this.Mode = VacuumMode.Quiet;
                break;
            case 60:
                this.Mode = VacuumMode.Standard;
                break;
            case 75:
                this.Mode = VacuumMode.Power;
                break;
            case 100:
                this.Mode = VacuumMode.Max;
                break;
            default:
                this.Mode = raw.fan_power; // 101, 102, 103, 104, 105
                break;
        }
    }

    Battery: number;
    SessionCleaningTime: number;
    SessionCleaningArea: number;

    IsCleaning: boolean;
    IsReturning: boolean;
    IsDndEnabled: boolean;

    State: VacuumState;
    Error: VacuumError;
    Mode: VacuumMode;
}
