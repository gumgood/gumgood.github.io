three_bars = document.querySelector("i.three-bars").parentElement;
x = document.querySelector("i.x").parentElement;
nav = document.querySelector("nav");

console.log(three_bars);
console.log(x);

three_bars.addEventListener("click", function () {
    nav.style.left = "0";
});
x.addEventListener("click", function () {
    nav.style.left = "-260px";
});