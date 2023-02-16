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

fetch(data.apis.me_user,{
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

    let id = document.getElementById("id")
    id.innerHTML=`Identificacion: ${json.response.person.id}`

    let name = document.getElementById("name")
    name.innerHTML=`${json.response.person.name}`

    let lastName = document.getElementById("lastName")
    lastName.innerHTML=`Apellidos: ${json.response.person.lastName}`

    let phone = document.getElementById("phone")
    phone.innerHTML=`Teléfono: ${json.response.person.phone}`

    let email = document.getElementById("email")
    email.innerHTML=`${json.response.user.email}`
     
        
    
})
.catch(er=>{
    console.log("Error", er)
}).finally(()=>{
    console.log("Promesa recibida")
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