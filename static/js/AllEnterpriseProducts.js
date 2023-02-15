let lat 
let lng
let id



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

    const $enterpriseName =document.getElementById("enterpriseName")
    const $enterprisePhone =document.getElementById("enterprisePhone")
    const $enterpriseImg =document.getElementById("enterpriseImg")

    const $container =document.getElementById("containerProducts")
    $fragment = document.createDocumentFragment()
    



    async function getData(){
        try {
            const valores = window.location.search;
            //Creamos la instancia
            const urlParams = new URLSearchParams(valores);

            //Accedemos a los valores
            id = urlParams.get('id');
            console.log(id)
            console.log(valores);

            let res= await  fetch(data.apis.products_enterprise,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + valor
                },
                body: JSON.stringify({
                    'id': id
                })
            })
            json = await res.json()
            console.log(res,json)

            coordResponse = json.location
            coordArray = coordResponse.split(',')
            lat = parseFloat(coordArray[0])
            lng = parseFloat(coordArray[1])
            iniciarMap(lat,lng)

            
            $enterpriseImg.setAttribute("style",`background-image: url('${json.imagePath}')`)
            $enterpriseName.innerHTML=`SOMOS ${json.name}`
            $enterprisePhone.innerHTML=`Llamanos al ${json.phone}`

            arrayProducts = json.productList

            arrayProducts.forEach(product=>{

                const $div = document.createElement("div")
                $div.setAttribute("class","col divCard")

                const $img =  document.createElement("img")
                $img.setAttribute("class","images_storedesc")
                $img.setAttribute("src",`${product.imagePath}`)

                const $divBody = document.createElement("div")
                $divBody.setAttribute("class","card-body")

                const $h5 = document.createElement("h5")
                $h5.setAttribute("class","card-title")
                $h5.innerHTML=`${product.name}`

                const $pCode = document.createElement("p")
                $pCode.setAttribute("class","card-text")
                $pCode.innerHTML=`Referencia: ${product.code}`

                const $pPrice = document.createElement("p")
                $pPrice.setAttribute("class","card-text")
                $pPrice.innerHTML=`Precio: $${product.price}`

                const $pDecription = document.createElement("p")
                $pDecription.setAttribute("class","card-text description")
                $pDecription.innerHTML=`Descripcion: ${product.description}`

                const $linkWsp = document.createElement("a")
                $linkWsp.setAttribute("href",`https://wa.me/57${product.phone}`)
                $linkWsp.setAttribute("target","_blank")

                const $iconWsp = document.createElement("i")
                $iconWsp.setAttribute("class","fa-brands fa-whatsapp")

                const $wspTxt = document.createElement("span")
                $wspTxt.setAttribute("class","wsp")
                $wspTxt.innerHTML="Escribenos"

                $div.appendChild($img)
                $div.appendChild($divBody)
                $divBody.appendChild($h5)
                $divBody.appendChild($pCode)
                $divBody.appendChild($pPrice)
                $divBody.appendChild($pDecription)
                $divBody.appendChild($wspTxt)
                $linkWsp.appendChild($iconWsp)
                $divBody.appendChild($linkWsp)

                $fragment.appendChild($div)
            

            })

            $container.appendChild($fragment)


        } catch (error) {
            console.log(error)
        }finally{
            console.log("promesa recibida")
        }

    }


    getData();


    
})();

function iniciarMap(x,y){
    console.log(lat,lng)
    let coord = { 
        lat: x,
        lng: y
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


