import { ApiError, ApiErrorType } from "../../common/ApiError";
import Vue from "vue";

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
}

const vm = new Vue({
    el: "#root",
    data: {
        message: "Hello from Vue!"
    }
});