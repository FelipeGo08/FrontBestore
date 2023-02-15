
(()=>{

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



    async function getData(){
        try {

            let resId= await  fetch(data.apis.me_enterprise,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + valor
                }})
            jsonId = await resId.json()
            console.log(resId,jsonId)
            let id = jsonId.response.id

            let resEnterprise= await  fetch(data.apis.products_enterprise,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + valor
                },
                body: JSON.stringify({
                    'id': id
                })
            })
            
            let jsonEnterprise = await resEnterprise.json()
            console.log(resEnterprise,jsonEnterprise)

            let products = jsonEnterprise.productList
            
            let productList = $('#productList');
                productList.html('');
                products.forEach(product => {
                    productList.append(`
      <tr id="product-${product.id}">
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td><img src="${product.imagePath}" alt="" class="img-thumbnail" width="100%" height="50%"></td>
        <td>
          <button type="button" class="btn btn-primary editProductBtn" data-id="${product.id}">Edit</button>
          <button type="button" class="btn btn-danger deleteProductBtn" data-id="${product.id}">Delete</button>
        </td>
      </tr>`);
                });

         


        } catch (error) {
            console.log(error)
        }finally{
            console.log("promesa recibida")
        }

    }
    getData();
   
    $(document).on('click', '.editProductBtn', function () {
        let id = $(this).data('id');
        let elemento = document.getElementById(`product-${id}`)
        let elementosFila = elemento.getElementsByTagName("td");

        console.log(elementosFila[3].innerHTML)
        

            $('#editName').val(elementosFila[0].innerHTML);
            $('#editPrice').val(elementosFila[1].innerHTML);
            $('#editDescription').val(elementosFila[2].innerHTML);
            $('#editImage').val();
            jQuery.noConflict();
            $('#editProductModal').modal('show');
            
    });
})();

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

/*$(document).ready(function () {
    // Get products list
    function getProducts() {
        $.ajax({
            url: '',
            type: 'GET',
            success: function (response) {
                let products = JSON.parse(response);
                let productList = $('#productList');
                productList.html('');
                products.forEach(product => {
                    productList.append(`
      <tr id="product-${product.id}">
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td><img src="${product.image}" alt="" class="img-thumbnail" width="100"></td>
        <td>
          <button type="button" class="btn btn-primary editProductBtn" data-id="${product.id}">Edit</button>
          <button type="button" class="btn btn-danger deleteProductBtn" data-id="${product.id}">Delete</button>
        </td>
      </tr>`);
                });
            }
        });
    }

    getProducts();

    // Add product
    $('#addProductForm').submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            url: '',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                $('#addProductModal').modal('hide');
                $('#addProductForm')[0].reset();
                getProducts();
            }
        });
    });

    // Edit product
    $(document).on('click', '.editProductBtn', function () {
        let id = $(this).data('id');
        $.ajax({
            url: '',
            type: 'GET',
            data: { id: id },
            success: function (response) {
                let product = JSON.parse(response);
                $('#editId').val(product.id);
                $('#editName').val(product.name);
                $('#editPrice').val(product.price);
                $('#editDescription').val(product.description);
                $('#editImage').val(product.image);
                $('#editProductModal').modal('show');
            }
        });
    });
    $('#editProductForm').submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            url: '',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                $('#editProductModal').modal('hide');
                $('#editProductForm')[0].reset();
                getProducts();
            }
        });
    });

    // Delete product
    $(document).on('click', '.deleteProductBtn', function () {
        let id = $(this).data('id');
        $.ajax({
            url: '',
            type: 'GET',
            data: { id: id },
            success: function (response) {
                $(`#product-${id}`).remove();
            }
        });
    });
});*/

