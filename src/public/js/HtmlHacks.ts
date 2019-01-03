
export default function Apply() {
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