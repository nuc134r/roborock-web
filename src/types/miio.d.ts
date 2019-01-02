declare module "miio" {

    export function device(config: DeviceConfig): Promise<Device>;

    export interface DeviceConfig {
        address: string;
        token: string;
    }

    export interface Device {
        call(method: string, params: Array<any>): Promise<any>;
    }
}

