(()=>{
    const $container =document.getElementById("storeContainer")
    $fragment = document.createDocumentFragment()

    async function getData(){
        try {
            let res= await  fetch("http://localhost:8080/api/enterprise/findAll")
            json = await res.json()
            console.log(res,json)

            json.forEach(enterprise => {
                const $div = document.createElement("div")
                $div.setAttribute("class","col-sm-5  col-md-5 col-lg-5")

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
                $pPhone.setAttribute("class","card-text")
                $pPhone.innerHTML=`Teléfono: ${enterprise.phone}`

                const $a = document.createElement("a")
                $a.setAttribute("class","btn btn-primary")
                $a.setAttribute("href",`store_description.html?id=${enterprise.id}`)
                $a.innerHTML='Ver Productos'

                $div.appendChild($img)
                $div.appendChild($divBody)
                $divBody.appendChild($h5)
                $divBody.appendChild($pNit)
                $divBody.appendChild($pPhone)
                $divBody.appendChild($a)

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

