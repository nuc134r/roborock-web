document.addEventListener("DOMContentLoaded", function (event) {
    window.scrollTo(0, 1);

    const parser = new UAParser();
    if (parser.getResult().os.name == "Android") {
        // alert("Android");
    }
});