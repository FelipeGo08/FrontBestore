var direccion = document.getElementById("crearUbicacion");
var validacionDirect = document.getElementById("validacionDirec");

function validar(){
    if(direccion.innerHTML=="Dirección"){
        validacionDirect.innerHTML = "Asegurate de seleccionar la ubicación de la empresa."
        return false 
    }else{
        return true
    }
}