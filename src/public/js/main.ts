import { ApiError, ApiErrorType } from "../../common/ApiError";

document.addEventListener("DOMContentLoaded", DomLoaded);

function DomLoaded() {
    ConfigureHeight();
}

function ConfigureHeight() {
    function setVerticalSize() {
        const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.documentElement.setAttribute("style", "height:" + vH + "px;");
    }
    setVerticalSize();

    window.addEventListener("onorientationchange", setVerticalSize, true);
    window.onresize = () => setVerticalSize();

    const a = new ApiError("s", ApiErrorType.RobotNotConnected);
    console.log(a.Error);
}