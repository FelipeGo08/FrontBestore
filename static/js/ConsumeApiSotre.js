
(()=>{
    var request = new XMLHttpRequest();
    request.open("GET", "/static/json/urls.json", false);
    request.send(null);
    var data = JSON.parse(request.responseText);
    console.log(data);
    let valor = getCookie("session")
    let decoded 

    if(valor.length == 0){
        window.location.replace(data.pages.login)
    }else{
        console.log("logeado correctamente")
        console.log(valor)
        
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
        
        } catch (error) {
            console.error(error);
        }

        const user = document.getElementById("user")
        user.innerHTML=`${decoded.sub}`
        
        
    }

    const signOut = document.getElementById("signOut")

    signOut.addEventListener('click',(e)=>{
        //console.log("sesion cerrada")
        setCookie("session", "", -1);
        window.location.replace(data.pages.login)
    })


    const $container =document.getElementById("storeContainer")
    $fragment = document.createDocumentFragment()

    async function getData(){
        try {
            let res= await  fetch(data.apis.enterprises,{
                method: 'GET',
                headers: {
                "Authorization": "Bearer " + valor
                }
            })
            json = await res.json()
            console.log(res,json)

            json.forEach(enterprise => {
                const $div = document.createElement("div")
                $div.setAttribute("class","col-sm-5  col-md-5 col-lg-5 divCard")

                const $img =  document.createElement("img")
                $img.setAttribute("class","images")
                $img.setAttribute("src",`${enterprise.imagePath}`)

                const $divBody = document.createElement("div")
                $divBody.setAttribute("class","card-body")

                const $h5 = document.createElement("h5")
                $h5.setAttribute("class","card-title")
                $h5.innerHTML=`${enterprise.name}`

                const $pNit = document.createElement("p")
                $pNit.setAttribute("class","card-text")
                $pNit.innerHTML=`NIT: ${enterprise.nit}`

                const $pPhone = document.createElement("p")
                $pPhone.setAttribute("class","card-text phone")
                $pPhone.innerHTML=`Teléfono: ${enterprise.phone}`

                const $linkWsp = document.createElement("a")
                $linkWsp.setAttribute("href",`https://wa.me/57${enterprise.phone}`)
                $linkWsp.setAttribute("target","_blank")

                const $iconWsp = document.createElement("i")
                $iconWsp.setAttribute("class","fa-brands fa-whatsapp")

                const $a = document.createElement("a")
                $a.setAttribute("class","btn btn-primary")
                $a.setAttribute("href",`store_description.html?id=${enterprise.id}`)
                $a.innerHTML='Ver Productos'

                $div.appendChild($img)
                $div.appendChild($divBody)
                $divBody.appendChild($h5)
                $divBody.appendChild($pNit)
                $divBody.appendChild($pPhone)
                $linkWsp.appendChild($iconWsp)
                $divBody.appendChild($a)
                $divBody.appendChild($linkWsp)
                

                $fragment.appendChild($div)
            });

            $container.appendChild($fragment)
        } catch (error) {
            console.log(error)
        }finally{
            console.log("pormesa recibida")
        }

    }
    getData();  
})();

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