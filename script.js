const input = document.querySelector("#text");
const btn = document.querySelector("#btn");
const square = document.querySelector("#square");
const eBtn = document.querySelector("#e_btn");
const inputRange = document.querySelector("#range");
const circle = document.querySelector("#circle");

btn.addEventListener("click", function () {
  if (input.value !== "") {
    square.style.backgroundColor = input.value;
    input.value = "";
  }
});

eBtn.style.display = "none";

inputRange.addEventListener("input", function () {
  circle.style.width = inputRange.value + "%";
  circle.style.height = inputRange.value + "%";
});
