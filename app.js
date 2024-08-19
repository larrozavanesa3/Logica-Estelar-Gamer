"use strict";

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;

// Asignar texto a los elementos
function asignarTextoElemento(selector, texto) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.textContent = texto;
    }
}

// Verificar el intento del usuario
function verificarIntento() {
    const valorUsuario = document.getElementById('valorUsuario').value.trim();
    const numeroDeUsuario = parseInt(valorUsuario, 10);

    // Validar entrada
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('.texto__parrafo', `Por favor, ingresa un número válido entre 1 y ${numeroMaximo}.`);
        limpiarCaja();
        return;
    }

    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('.texto__parrafo', `¡Lo has logrado en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
        asignarTextoElemento('.titulo', '¡Correcto! Has acertado');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es menor.');
        } else {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es mayor.');
        }
        limpiarCaja();
    }
}

// Limpiar el input
function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
    document.getElementById('valorUsuario').focus();
}

// Generar número secreto no repetido
function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('.titulo', 'FIN DEL JUEGO');
        asignarTextoElemento('.texto__parrafo', 'Has alcanzado el número máximo de juegos.');
        document.getElementById('intentar').setAttribute('disabled', 'true');
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

// Configuraciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('.titulo', 'Juego del Número Secreto');
    asignarTextoElemento('.texto__parrafo', `Adivina el número entre 1 y ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').removeAttribute('disabled');
    limpiarCaja();
}

// Reiniciar el juego
function reiniciarJuego() {
    condicionesIniciales();
}

// Event Listener para la tecla Enter
document.getElementById('valorUsuario').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        verificarIntento();
    }
});

// Iniciar el juego al cargar la página
window.onload = condicionesIniciales;





