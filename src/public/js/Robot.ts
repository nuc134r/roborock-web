import { CallApi, HttpMethod, EnsureNotApiError } from "./Http";
import { RoborockStatus } from "../../common/RoborockStatus";
import { ApiError } from "../../common/ApiError";

export async function GetStatus(): Promise<ApiResult<RoborockStatus>> {
    const result = await CallApi(HttpMethod.Get, "status");
    return ConstructApiResult<RoborockStatus>(result);
}

export async function FindMe(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Get, "find_me");
    return ConstructApiResult<any>(result);
}

export async function SetSweepMode(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Post, "sweep");
    return ConstructApiResult<any>(result);
}

export async function SetMopMode(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Post, "mop");
    return ConstructApiResult<any>(result);
}

export async function StartCleanup(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Post, "start");
    return ConstructApiResult<any>(result);
}

export async function PauseCleanup(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Post, "pause");
    return ConstructApiResult<any>(result);
}

export async function GoHome(): Promise<ApiResult<any>> {
    const result = await CallApi(HttpMethod.Post, "go_home");
    return ConstructApiResult<any>(result);
}

function ConstructApiResult<T>(result: any): ApiResult<T> {
    const apiResult = new ApiResult<T>();
    if (EnsureNotApiError(result)) {
        apiResult.Result = result;
    } else {
        apiResult.Error = result;
    }

    return apiResult;
}

class ApiResult<T> {
    Error: ApiError;
    Result: T;
}