var request = new XMLHttpRequest();
request.open("GET", "/static/json/urls.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
console.log(data);

const formButton = document.getElementById("registerForm")
let response = document.getElementById("response")
formButton.addEventListener('submit', (e) => {
  e.preventDefault();


    let correo = document.getElementById("inputEmail")
    let pass = document.getElementById("inputPassword")
    let passConfirm = document.getElementById("inputConfirmPassword")

    if(pass.value == passConfirm.value){
        
        fetch(data.apis.register,{
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
