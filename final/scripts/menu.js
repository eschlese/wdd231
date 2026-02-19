const nav = document.querySelector(".navigation");
const button = document.querySelector("#menu");

button.addEventListener("click", function () {
    nav.classList.toggle("open");
    button.classList.toggle("open");
});