var request = new XMLHttpRequest();
request.open("GET", "/static/json/urls.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
console.log(data);

const filterString = document.getElementById("filterTxt")
const filterOption = document.getElementById("filterOption")

const $container =document.getElementById("containerProducts")
$fragment = document.createDocumentFragment()



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



let timer
filterString.addEventListener('keyup', (e) => {
    e.preventDefault();
    console.log(filterString.value)
    clearTimeout(timer)
    timer = setTimeout(() => {
        if(filterOption.value == "Producto"){
            fetch(data.apis.filter_by_product_name,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + valor
                },
                body: JSON.stringify({
                    "name":filterString.value
                }
                )
            }).then(res =>{
                console.log(res)
                return  res.ok ? res.json():Promise.reject(res)
            }).then(json=>{
                console.log(json)

                while ($container.firstChild) {
                    $container.removeChild($container.firstChild);
                }
                //construcción del DOM
                json.forEach(product => {
                    const $div = document.createElement("div")
                    $div.setAttribute("class","col divCard")

                    const $img =  document.createElement("img")
                    $img.setAttribute("class","imgProduct")
                    $img.setAttribute("src",`${product.imagePath}`)

                    const $divBody = document.createElement("div")
                    $divBody.setAttribute("class","card-body")

                    const $h5TitleEnterprise = document.createElement("h5")
                    $h5TitleEnterprise.setAttribute("class","card-title")
                    $h5TitleEnterprise.innerHTML=`Empresa: ${product.enterpriseName}`

                    const $enterpriseNit = document.createElement("p")
                    $enterpriseNit.setAttribute("class","card-text")
                    $enterpriseNit.innerHTML=`Nit: ${product.enterpriseNit}`

                    const $enterprisePhone = document.createElement("p")
                    $enterprisePhone.setAttribute("class","card-text")
                    $enterprisePhone.innerHTML=`Telefono: ${product.enterprisePhone}`


                    const $h5TitleProduct = document.createElement("h5")
                    $h5TitleProduct.setAttribute("class","card-title")
                    $h5TitleProduct.innerHTML=`Producto: ${product.productName}`

                    const $productCode = document.createElement("p")
                    $productCode.setAttribute("class","card-text")
                    $productCode.innerHTML=`Referencia Producto: ${product.productCode}`

                    const $productDescription = document.createElement("p")
                    $productDescription.setAttribute("class","card-text description")
                    $productDescription.innerHTML=`Descripcion Producto: ${product.productDescription}`

                    const $productPrice = document.createElement("p")
                    $productPrice.setAttribute("class","card-text")
                    $productPrice.innerHTML=`Precio Producto: $${product.productPrice}`
                    
                    const $linkWsp = document.createElement("a")
                    $linkWsp.setAttribute("href",`https://wa.me/57${product.enterprisePhone}`)
                    $linkWsp.setAttribute("target","_blank")

                    const $iconWsp = document.createElement("i")
                    $iconWsp.setAttribute("class","fa-brands fa-whatsapp")

                    const $wspTxt = document.createElement("span")
                    $wspTxt.innerHTML="Chatea con nosotros"


                    
                    $div.appendChild($img)
                    $div.appendChild($divBody)
                    $divBody.appendChild($h5TitleEnterprise)
                    $divBody.appendChild($enterpriseNit)
                    $divBody.appendChild($enterprisePhone)
                    $divBody.appendChild($h5TitleProduct)
                    $divBody.appendChild($productCode)
                    $divBody.appendChild($productDescription)
                    $divBody.appendChild($productPrice)
                    $divBody.appendChild($wspTxt)
                    $linkWsp.appendChild($iconWsp)
                    $divBody.appendChild($linkWsp)
                    $fragment.appendChild($div)




                });
                $container.appendChild($fragment)

            })
            .catch(er=>{
                console.log("Error", er)
            }).finally(()=>{
                console.log("Promesa recibida")
            })
        }else{
            fetch(data.apis.filter_by_enterprise_name,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + valor
                },
                body: JSON.stringify({
                    "name":filterString.value
                }
                )
            }).then(res=>{
                console.log(res)
                return  res.ok ? res.json():Promise.reject(res)
            }).then(json=>{
                console.log(json)

                while ($container.firstChild) {
                    $container.removeChild($container.firstChild);
                }

                json.forEach(element=>{
                    element.productList.forEach(product=>{
                        const $div = document.createElement("div")
                        $div.setAttribute("class","col divCard")

                        const $img =  document.createElement("img")
                        $img.setAttribute("class","imgProduct")
                        $img.setAttribute("src",`${product.imagePath}`)

                        const $divBody = document.createElement("div")
                        $divBody.setAttribute("class","card-body")

                        const $h5TitleEnterprise = document.createElement("h5")
                        $h5TitleEnterprise.setAttribute("class","card-title")
                        $h5TitleEnterprise.innerHTML=`Empresa: ${element.name}`

                        const $enterpriseNit = document.createElement("p")
                        $enterpriseNit.setAttribute("class","card-text")
                        $enterpriseNit.innerHTML=`Nit: ${element.nit}`

                        const $enterprisePhone = document.createElement("p")
                        $enterprisePhone.setAttribute("class","card-text")
                        $enterprisePhone.innerHTML=`Telefono: ${element.phone}`


                        const $h5TitleProduct = document.createElement("h5")
                        $h5TitleProduct.setAttribute("class","card-title")
                        $h5TitleProduct.innerHTML=`Producto: ${product.name}`

                        const $productCode = document.createElement("p")
                        $productCode.setAttribute("class","card-text")
                        $productCode.innerHTML=`Referencia Producto: ${product.code}`

                        const $productDescription = document.createElement("p")
                        $productDescription.setAttribute("class","card-text description")
                        $productDescription.innerHTML=`Descripcion Producto: ${product.description}`

                        const $productPrice = document.createElement("p")
                        $productPrice.setAttribute("class","card-text")
                        $productPrice.innerHTML=`Precio Producto: $${product.price}`
                        
                        const $linkWsp = document.createElement("a")
                        $linkWsp.setAttribute("href",`https://wa.me/57${element.phone}`)
                        $linkWsp.setAttribute("target","_blank")

                        const $iconWsp = document.createElement("i")
                        $iconWsp.setAttribute("class","fa-brands fa-whatsapp")

                        const $wspTxt = document.createElement("span")
                        $wspTxt.innerHTML="Chatea con nosotros"

                        $div.appendChild($img)
                        $div.appendChild($divBody)
                        $divBody.appendChild($h5TitleEnterprise)
                        $divBody.appendChild($enterpriseNit)
                        $divBody.appendChild($enterprisePhone)
                        $divBody.appendChild($h5TitleProduct)
                        $divBody.appendChild($productCode)
                        $divBody.appendChild($productDescription)
                        $divBody.appendChild($productPrice)
                        $divBody.appendChild($wspTxt)
                        $linkWsp.appendChild($iconWsp)
                        $divBody.appendChild($linkWsp)
                        $fragment.appendChild($div)



                   })
                   $container.appendChild($fragment)

                })


            })
            .catch(er=>{
                console.log("Error", er)
            }).finally(()=>{
                console.log("Promesa recibida")
            })
        }
    }, 500)

    


   
    
});

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