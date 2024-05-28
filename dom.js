let buttonGuardar = document.querySelector('#button_guardar');
let mensaje = document.querySelector('#mensaje')
let tooltipText = buttonGuardar.getAttribute('data-tooltip');
let timeoutId;

function showDataTooltip() {
   timeoutId = setTimeout(function() {
        mensaje.textContent = tooltipText;
        mensaje.classList.remove('hidden');
        mensaje.style.display = 'flex';
    },3000);
}

function hideDataTooltip() {
    clearTimeout(timeoutId)
    mensaje.classList.add('hidden');
    mensaje.style.display = '';
}

buttonGuardar.addEventListener('mouseover', showDataTooltip);
buttonGuardar.addEventListener('mouseleave', hideDataTooltip);
 
//----------------------------------------------------------------------------------

let inputNombre = document.querySelector('#nombre');
let validacionNombre = document.querySelector('#validacionNombre');

let inputApodo = document.querySelector('#apodo');
let validacionApodo = document.querySelector('#validacionApodo');
let valoresValidosApodo = /^[a-zA-Z0-9]*$/;

let inputBiografia = document.querySelector('#biografia');
let validacionBiografia = document.querySelector('#validacionBiografia');

let inputContrasena = document.querySelector('#contrasena');
let validacionContrasena = document.querySelector('#validacionContrasena');
let valoresValidosContrasena = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

let formButton = document.querySelector('.form_button');
let responseContainer = document.querySelector('.response-container'); // Añadido para referencia al contenedor de respuestas

function validarNombre() {
    let valorNombre = inputNombre.value.trim();

    if (valorNombre === "") {
        validacionNombre.textContent = "El nombre no puede estar vacío o contener solo espacios";
        localStorage.removeItem('nombre');
    } else {
        validacionNombre.textContent = "";
        localStorage.setItem('nombre', valorNombre);
    }
    actualizarEstadoBoton();
}

function validarApodo() {
    let valorApodo = inputApodo.value;

    if (valorApodo.length >= 3 && valorApodo.length <= 10 && valoresValidosApodo.test(valorApodo)) {
        validacionApodo.textContent = "";
        localStorage.setItem('apodo', valorApodo);
    } else {
        validacionApodo.textContent = "Entre 3 y 10 caracteres alfanuméricos";
        localStorage.removeItem('apodo');
    }
    actualizarEstadoBoton();
}

function validarBiografia() {
    let valorBiografia = inputBiografia.value;

    if (valorBiografia.length === 0) {
        validacionBiografia.textContent = "";
    } else if (valorBiografia.length < 100) {
        validacionBiografia.textContent = "Mínimo 100 caracteres";
        localStorage.removeItem('biografia');
    } else {
        validacionBiografia.textContent = "";
        localStorage.setItem('biografia', valorBiografia);
    }
    actualizarEstadoBoton();
}

function validarContrasena() {
    let valorContrasena = inputContrasena.value;

    if (valorContrasena.length >= 8 && valoresValidosContrasena.test(valorContrasena)) {
        validacionContrasena.textContent = "";
    } else {
        validacionContrasena.textContent = "Minimo 8 caracteres, al menos una letra mayúscula y un número";
    }
    actualizarEstadoBoton();
}

function actualizarEstadoBoton() {
    if (validacionNombre.textContent === "" &&
        validacionApodo.textContent === "" &&
        validacionBiografia.textContent === "" &&
        validacionContrasena.textContent === "") {
        formButton.disabled = false; // Habilitar el botón
    } else {
        formButton.disabled = true; // Deshabilitar el botón
    }
}

inputNombre.addEventListener('input', validarNombre);
inputApodo.addEventListener('input', validarApodo);
inputBiografia.addEventListener('input', validarBiografia);
inputBiografia.addEventListener('blur', validarBiografia);
inputContrasena.addEventListener('input', validarContrasena);

window.addEventListener('load', function () {
    if (localStorage.getItem('nombre')) {
        inputNombre.value = localStorage.getItem('nombre');
    }
    if (localStorage.getItem('apodo')) {
        inputApodo.value = localStorage.getItem('apodo');
    }
    if (localStorage.getItem('biografia')) {
        inputBiografia.value = localStorage.getItem('biografia');
    }
});

document.querySelector('.form_content').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir envío por defecto

    if (validacionApodo.textContent !== "" ||
        validacionBiografia.textContent !== "" ||
        validacionContrasena.textContent !== "" ||
        validacionNombre.textContent !== "") {
        return; // Detener la ejecución si hay errores de validación
    }

    // Preparar datos para enviar al servidor
    let url = 'https://mocktarget.apigee.net/echo';
    let data = {
        nombre: inputNombre.value.trim(),
        apodo: inputApodo.value,
        biografia: inputBiografia.value,
        contrasena: '********' // No guardar contrasena en localStorage, se envía sin persistir
    };

    let requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Enviar solicitud fetch
    fetch(url, requestConfig)
        .then(response => response.json())
        .then(data => {
            mostrarRespuesta(data); // Llamar a función para mostrar respuesta del servidor
        })
        .catch(error => {
            console.error('Error al procesar la solicitud:', error);
            mostrarRespuesta({ error: 'Error al procesar la solicitud' }); // Manejar error
        });
});

function mostrarRespuesta(data) {
    // Limpiar contenedor de respuestas previas
    responseContainer.innerHTML = '';

    // Crear elementos para mostrar la respuesta
    let responseTitle = document.createElement('h3');
    responseTitle.textContent = 'Respuesta del servidor:';
    responseContainer.appendChild(responseTitle);

    let responseData = document.createElement('pre');
    responseData.textContent = JSON.stringify(data, null, 2);
    responseData.classList.add('respuestaServidor');
    responseContainer.appendChild(responseData);

    // Mostrar contenedor de respuestas
    responseContainer.style.display = 'block';
}
