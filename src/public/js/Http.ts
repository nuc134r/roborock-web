import { ApiError } from "../../common/ApiError";

export function EnsureNotApiError(error: ApiError): boolean {
    if (error.Error == undefined || error.ErrorCode == undefined) {
        return true;
    }
    return false;
}

export const enum HttpMethod {
    Get = "GET",
    Post = "POST"
}

export function CallApi(method: HttpMethod, apiPath: string): Promise<any> {
    const xhr = new XMLHttpRequest();
    xhr.open(method, "/api/" + apiPath, true);
    xhr.send();

    const promise = new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            // if (xhr.status != 200) {
            //    reject(JSON.parse(xhr.responseText));
            // } else {
                resolve(JSON.parse(xhr.responseText));
            // }
        };
    });

    // working

    return promise;
}