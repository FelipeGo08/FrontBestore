let accessibilityBtn = document.getElementById("accesibilidadBtn");
let accessibilityMenu = document.getElementById("accesibilidadMenu");

accessibilityBtn.addEventListener("click", function () {
  accessibilityMenu.classList.toggle("d-none");
  accessibilityMenu.classList.toggle("d-block");
});

