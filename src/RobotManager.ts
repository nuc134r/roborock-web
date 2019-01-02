import * as Miio from "miio";
import { Roborock } from "./models/Roborock";

export let Robot: Roborock;

export async function Initialize(config: Miio.DeviceConfig): Promise<any> {
    const device = await Miio.device(config);
    Robot = new Roborock(device);
}