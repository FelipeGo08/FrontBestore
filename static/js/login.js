const formButton = document.getElementById("formLogin")
const respuesta = document.getElementById("response")
formButton.addEventListener('submit', (e) => {
  e.preventDefault();


  let correo = document.getElementById("inputEmail")
  let pass = document.getElementById("inputPassword")


    let res=   fetch("http://localhost:8080/api/site/login",{
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
        
        if(res.redirected){
            window.location.replace(res.url)
        }  
        if(!res.ok)
            respuesta.innerHTML="Datos incorrectos, error de autenticación"
            
        return  res.ok ? res.json():Promise.reject(res)
    }).then(json=>{
        
        respuesta.innerHTML=""
        console.log(json)
        console.log(json.response.token)
        //document.cookie = "session="+json.message+";path=/"
    })
    .catch(er=>{
        console.log("Error", er)
    }).finally(()=>{
        console.log("Promesa recibida")
    })
    
});

