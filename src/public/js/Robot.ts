import { CallApi, HttpMethod, EnsureNotApiError } from "./Http";
import { RoborockStatus } from "../../common/RoborockStatus";
import { ApiError } from "../../common/ApiError";

export async function GetStatus(): Promise<ApiResult<RoborockStatus>> {
    const result = await CallApi(HttpMethod.Get, "status");

    const apiResult = new ApiResult<RoborockStatus>();
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