let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);

let operacion = Math.floor(Math.random() * 3);
let pregunta, respuestaCorrecta;

let validacion

switch (operacion) {
    case 0:
        pregunta = `${num1} + ${num2} = ?`;
        respuestaCorrecta = num1 + num2;
        break;
    case 1:
        pregunta = `${num1} - ${num2} = ?`;
        respuestaCorrecta = num1 - num2;
        break;
    case 2:
        pregunta = `${num1} * ${num2} = ?`;
        respuestaCorrecta = num1 * num2;
        break;
}

let pregunta2 = document.getElementById("pregunta")
pregunta2.innerHTML = "Resuelve la siguiente operación: " + pregunta

function generarOperacion() {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);

    operacion = Math.floor(Math.random() * 3);

    let validacion

    switch (operacion) {
        case 0:
            pregunta = `${num1} + ${num2} = ?`;
            respuestaCorrecta = num1 + num2;
            break;
        case 1:
            pregunta = `${num1} - ${num2} = ?`;
            respuestaCorrecta = num1 - num2;
            break;
        case 2:
            pregunta = `${num1} * ${num2} = ?`;
            respuestaCorrecta = num1 * num2;
            break;
    }

    let pregunta2 = document.getElementById("pregunta")
    pregunta2.innerHTML = "Resuelve la siguiente operación: " + pregunta
}

function verificarRespuesta() {
    const respuesta = document.getElementById("respuesta").value;
    let respuesta2 = document.getElementById("respuestaTxt")

    if (respuesta == respuestaCorrecta) {
        respuesta2.innerHTML = "Respuesta Correcta!"
        validacion = true
    } else {
        respuesta2.innerHTML = "Respuesta Incorrecta, intente de nuevo."
        validacion = false
        generarOperacion()
    }
    if (validacion) {
        let submit = document.getElementById("submitsignin")
        submit.removeAttribute("disabled");
        submit.setAttribute("enable", true);
        let element = document.getElementById("recaptcha");
        if (element) element.remove();
    }
}
