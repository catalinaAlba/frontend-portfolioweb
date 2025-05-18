const toggleNav = document.querySelector("#toggle-nav");
const buttonAbrir = document.querySelector("#btn-abrir");
const buttonCerrar = document.querySelector("#btn-cerrar");

buttonAbrir.addEventListener("click", () => {
    toggleNav.classList.add("visible");
})

buttonCerrar.addEventListener("click", () => {
    toggleNav.classList.remove("visible")
})