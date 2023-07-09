const three_bars = document.querySelector("i.three-bars").parentElement;
const x = document.querySelector("i.x").parentElement;
const nav = document.querySelector("nav");

three_bars.addEventListener("click", function () {
    nav.style.left = "0";
});
x.addEventListener("click", function () {
    nav.style.left = "-260px";
});

const w_min = window.matchMedia("screen and (min-width: 850px)");
w_min.addEventListener("change", function (e) {
    if (e.matches) {
        nav.style.left = "0";
    } else {
        nav.style.left = "-260px";
    }
});