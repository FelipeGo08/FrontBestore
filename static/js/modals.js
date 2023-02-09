// Obtener los elementos
var btnP = document.getElementById("btPersona");
var btnE = document.getElementById("btEmpresa");
var btnM = document.getElementById("btMaps");
var btnA = document.getElementById("btAceptar");

var modalP = document.getElementById("ModalPerson");
var modalE = document.getElementById("ModalEnterprise");
var modalM = document.getElementById("ModalMaps");

var modalInt1 = document.getElementById("modalInt1");
var modalInt2 = document.getElementById("modalInt2");
var modalInt3 = document.getElementById("modalInt3");

var spanP = document.getElementsByClassName("close1")[0];
var spanE = document.getElementsByClassName("close2")[0];
var spanM = document.getElementsByClassName("close3")[0];

var labelU = document.getElementById("crearUbicacion");
var arrayDirecciones = ["Cra 15 # 14 - 58, Villavicencio, Meta","Avenida 14 # 60 - 15, Villavicencio, Meta","Cl. 2 #Sur 28-85, Villavicencio, Meta","Cl. 2a #31a-2, Villavicencio, Meta","Cra. 32 #1-15, Villavicencio, Meta","Cra. 26 #8-80, Villavicencio, Meta","Cra. 31 #10d-39, Cooperativo,, Villavicencio, Meta","Cra. 29a #5b-31 a 5b-1, Villavicencio, Meta","Cl. 4c #24-50, Villavicencio, Meta","a 55,, Cra. 19 #31, Villavicencio, Meta","Cl. 14 #39-22, Villavicencio, Meta","Cl. 22 #No. 34 54, Villavicencio, Meta"]
var numeroAleatorio

// Abrir el modal cuando se hace clic en el botón
btnP.onclick = function () {
    modalP.style.display = "block";
    modalInt1.style.width = "40%";
    modalInt1.style.marginTop = "10%";
    modalInt1.style.verticalAlign = "middle";
}

btnE.onclick = function () {
    modalE.style.display = "block";
    modalInt2.style.width = "40%";
    modalInt2.style.marginTop = "4%";
    modalE.style.overflow = "auto";
}
btnM.onclick = function () {
    modalM.style.display = "block";
    modalInt3.style.width = "40%";
    modalInt3.style.height = "40%";
    modalInt3.style.marginTop = "10%";
}
// cerrar modal
btnA.onclick = function (){
    numeroAleatorio = Math.floor(Math.random() * (arrayDirecciones.length-1)) + 1;
    btnM.innerHTML = "Cambiar ubicación";
    labelU.innerHTML = arrayDirecciones[numeroAleatorio]
    modalM.style.display = "none";
}

// Cerrar el modal cuando se hace clic en el botón cerrar
spanP.onclick = function () {
    modalP.style.display = "none";
}
spanE.onclick = function () {
    modalE.style.display = "none";
}
spanM.onclick = function () {
    modalM.style.display = "none";
}
// Cerrar el modal cuando se hace clic fuera del modal
window.onclick = function (event) {
    if (event.target == modalP) {
        modalP.style.display = "none";
    }
    if (event.target == modalE) {
        modalE.style.display = "none";
    }
    if (event.target == modalM) {
        modalM.style.display = "none";
    }
}