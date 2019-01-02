export enum ApiErrorType {
    RobotNotConnected = 0xDEAD
}

export class ApiError {
    constructor(error: string, code: ApiErrorType) {
        this.Error = error;
        this.ErrorCode = code;
    }

    Error: string;
    ErrorCode: ApiErrorType;
}