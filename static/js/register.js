const formButton = document.getElementById("registerForm")
let response = document.getElementById("response")
formButton.addEventListener('submit', (e) => {
  e.preventDefault();


    let correo = document.getElementById("inputEmail")
    let pass = document.getElementById("inputPassword")
    let passConfirm = document.getElementById("inputConfirmPassword")

    if(pass.value == passConfirm.value){
        
        fetch("http://localhost:8080/api/site/register",{
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
            response.innerHTML="¡Registro exitoso!"

           
        }).catch(er=>{
            console.log("Error", er)
        }).finally(()=>{
            console.log("Promesa recibida")
    })

    }else{
        
        response.innerHTML="Las contraseñas no coinciden"
    }

    
    
});
