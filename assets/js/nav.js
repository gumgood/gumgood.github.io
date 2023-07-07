three_bars = document.querySelector("i.three-bars");
x = document.querySelector("i.x");
nav = document.querySelector("nav");

three_bars.addEventListener("click", function () {
    nav.style.left = "0";
});
x.addEventListener("click", function () {
    nav.style.left = "-260px";
});