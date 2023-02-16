var request = new XMLHttpRequest();
request.open("GET", "/static/json/urls.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
console.log(data);

let valor = getCookie("session")

if(valor.length == 0){
  window.location.replace(data.pages.login)
}else{
  console.log("logeado correctamente")
  console.log(valor)
  let decoded 

  try {
    decoded = decodeJWT(valor)
    console.log(decoded)
    console.log(decoded.exp)
    const expirationDate = new Date(decoded.exp * 1000);
    console.log(expirationDate)
    const now = new Date();
    console.log(now)

    if (expirationDate < now) {
      window.location.replace(data.pages.login)
    }
     
  }catch (error) {
    console.error(error);
  }

  const user = document.getElementById("user")
  user.innerHTML=`${decoded.sub}`
  
  
}

fetch(data.apis.me_enterprise,{
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + valor
    }
}).then(res=>{
    console.log(res)  
    return  res.ok ? res.json():Promise.reject(res)
}).then(json=>{
    
    console.log(json)

   let img = document.getElementById("imgEnterprise")
   img.setAttribute("src",`${json.response.imagePath}`)

   let nameEnterprise = document.getElementById("nameEnterprise")
   nameEnterprise.innerHTML=`${json.response.name}`

   let nitEnterprise = document.getElementById("nit")
   nitEnterprise.innerHTML=`NIT: ${json.response.nit}`

   let phone = document.getElementById("phone")
   phone.innerHTML=`Teléfono empresarial: ${json.response.phone}`

   let correo = document.getElementById("email")
   correo.innerHTML=`Correo empresarial: ${json.response.user.email}`

   let idPerson = document.getElementById("idPerson")
   idPerson.innerHTML=`Identificacion representante: ${json.response.person.id}`

   let namePerson = document.getElementById("name")
   namePerson.innerHTML=`Nombres representante: ${json.response.person.name}`

   let lastnamePerson = document.getElementById("lastNamePerson")
   lastnamePerson.innerHTML=`Apellidos representante: ${json.response.person.lastName}`

   let phonePerson = document.getElementById("namePerson")
   phonePerson.innerHTML=`Contacto representante: ${json.response.person.phone}`


  
        
    
})
.catch(er=>{
    console.log("Error", er)
}).finally(()=>{
    console.log("Promesa recibida")
})

let formaddImg = document.getElementById("addImg")

formaddImg.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.files[0])

      fetch(data.apis.enterprise_image,{
            method:'POST',
            headers: {
                "Authorization": "Bearer " + valor
            },
            body: formData
        }).then(res=>{
            console.log(res)

            return  res.ok ? res.json():Promise.reject(res)
        }).then(json=>{
            console.log(json)
            alert("imagen subida")

            
        })
        .catch(er=>{
            console.log("Error", er)
        }).finally(()=>{
            console.log("Promesa recibida")
        })

})






const signOut = document.getElementById("signOut")

signOut.addEventListener('click',(e)=>{
  //console.log("sesion cerrada")
  setCookie("session", "", -1);
  window.location.replace(data.pages.login)
})




function decodeJWT(token) {
  
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }
  
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    const signature = parts[2];
  
  
    const secret = 'secret-key';
    const expectedSignature = btoa(`${parts[0]}.${parts[1]}`);
  
    /*if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }*/
  
    return payload;
  }

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
    
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}