const formButton = document.getElementById("formLogin")
const respuesta = document.getElementById("response")
var request = new XMLHttpRequest();
request.open("GET", "/static/json/urls.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
console.log(data);

formButton.addEventListener('submit', (e) => {

    if (validarCaptcha()) {
        e.preventDefault();

        let correo = document.getElementById("inputEmail")
        let pass = document.getElementById("inputPassword")
        fetch(data.apis.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": correo.value,
                "password": pass.value,
            }
            )
        }).then(res => {
            console.log(res)


            if (!res.ok)
                respuesta.innerHTML = "Datos incorrectos, error de autenticación"

            return res.ok ? res.json() : Promise.reject(res)
        }).then(json => {

            console.log(json)
            if (json.response.route != null) {
                window.location.replace(json.response.route)
            }

            let token = json.response.token
            console.log(token)
            let decoded
            try {
                decoded = decodeJWT(token)
                console.log(decoded)

            } catch (error) {
                console.error(error);

            }

            document.cookie = "session=" + token + ";path=/"
            if (decoded.role == "ENTERPRISE") {
                window.location.replace(data.pages.login_enterprise)
            }

            if (decoded.role == "USER") {
                window.location.replace(data.pages.login_person)
            }


        })
            .catch(er => {
                console.log("Error", er)
            }).finally(() => {
                console.log("Promesa recibida")
            })
    }else{
        alert("Valide el captcha")
    }
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