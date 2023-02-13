const filterString = document.getElementById("filterTxt")
const filterOption = document.getElementById("filterOption")

const $container =document.getElementById("containerProducts")
$fragment = document.createDocumentFragment()

let timer
filterString.addEventListener('keyup', (e) => {
    e.preventDefault();
    console.log(filterString.value)
    clearTimeout(timer)
    timer = setTimeout(() => {
        if(filterOption.value == "Producto"){
            fetch("http://localhost:8080/api/enterprise/findProductsByName",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    //$wspTxt.setAttribute("class","fa-brands fa-whatsapp")
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
            let res=   fetch("http://localhost:8080/api/enterprise/findProductsByEnterpriseName",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            })
            .catch(er=>{
                console.log("Error", er)
            }).finally(()=>{
                console.log("Promesa recibida")
            })
        }
    }, 500)

    


   
    
});