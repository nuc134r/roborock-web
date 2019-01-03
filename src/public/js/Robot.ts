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