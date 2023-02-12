const valores = window.location.search;
const urlParams = new URLSearchParams(valores);

let email = urlParams.get('email');
console.log(email)
console.log(valores);

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

function iniciarMap(){
    let coord = { 
        lat: 4.148862,
        lng: -73.621603
    }

    let map = new google.maps.Map(document.getElementById("map"),{
        zoom:13.5,
        center:coord
    })

    let marker = new google.maps.Marker({
        position: coord,
        map: map
    })
}

let personForm = document.getElementById("personForm")

personForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
  
    let nombres = document.getElementById("nombreP")
    let apellidos = document.getElementById("apellidoP")
    let id = document.getElementById("idP")
    let telefono = document.getElementById("telefonoP")
    


  
  
    fetch("http://localhost:8080/api/site/login",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":correo.value,
            "password":pass.value,
        }
        )
      }).then(res=>{
          console.log(res)
          
              
          return  res.ok ? res.json():Promise.reject(res)
      }).then(json=>{
          
          console.log(json)
      })
      .catch(er=>{
          console.log("Error", er)
      }).finally(()=>{
          console.log("Promesa recibida")
      })
      
  });
  
let enterpriseForm = document.getElementById("enterpriseForm")

enterpriseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    let nombres = document.getElementById("nombreP")
    let apellidos = document.getElementById("apellidoP")
    let id = document.getElementById("idP")
    let telefono = document.getElementById("idP")
    let nit = document.getElementById("inputNitE")
    let nombre = document.getElementById("inputNombreE")
    let telefonoE = document.getElementById("inputTelefonoE") 
    let direccion = document.getElementById("crearUbicacion")
  
    
    
    fetch("http://localhost:8080/api/site/login",{
        method:'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":correo.value,
            "password":pass.value,
        }
        )
        }).then(res=>{
            console.log(res)
            
                
            return  res.ok ? res.json():Promise.reject(res)
        }).then(json=>{
            
            console.log(json.message)
        })
        .catch(er=>{
            console.log("Error", er)
        }).finally(()=>{
            console.log("Promesa recibida")
        })
        
    });
