export const enum VacuumState {
    Initiating = 1,
    ChargerOffline = 2,
    Waiting = 3,
    Cleaning = 5,
    Returning = 6,
    Charging = 8,
    ChargingError = 9,
    Paused = 10,
    SpotCleaning = 11,
    Error = 12,
    ShuttingDown = 13,
    Updating = 14,
    Docking = 15,
    ZoneCleaning = 17,
    Full = 100
}
