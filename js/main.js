// Función flecha para arrojar mensaje de saludo de despedida.
const mensajeDespedida = () => alert("¡Muchas gracias por visitar nuestra web!");

// Variables
let nombre = "";
let apellido = "";
let email = "";

// Registro de cliente.

const datosCliente = () => {
    nombre = prompt("Ingresa tu nombre, por favor.");
    if (nombre === null) {
        mensajeDespedida();
        return;
    }

    apellido = prompt("Ingresa tu apellido, por favor.");
    if (apellido === null) {
        mensajeDespedida();
        return;
    }

    email = prompt("Ingresa tu dirección de correo.");
    if (email === null) {
        mensajeDespedida();
        return;
    } else {
        console.log(`Has ingresado la siguiente dirección de correo: ${email}`);
    }
}

datosCliente();

// Servicios con sus valores
let servicios = {
    servicioSemipermanente: 4500,
    servicioKapping: 8500,
    servicioEsmaltado: 3000,
    servicioGelificadas: 11500
};

// Función para elegir el servicio a realizar.


function seleccionarServicios() {
    let serviciosSeleccionados = [];

    while (true) {
        let opcion = prompt(`Elige un servicio: \n1. Servicio Semipermanente $4500 \n2. Servicio Kapping $8500 \n3. Servicio Esmaltado $3000 \n4. Servicio Gelificadas $11500 \n\nPresiona Cancelar para finalizar y ver el costo total.`);

        if (opcion === null) {
            break;
        }

        switch (opcion) {
            case '1':
                serviciosSeleccionados.push(servicios.servicioSemipermanente);
                break;
            case '2':
                serviciosSeleccionados.push(servicios.servicioKapping);
                break;
            case '3':
                serviciosSeleccionados.push(servicios.servicioEsmaltado);
                break;
            case '4':
                serviciosSeleccionados.push(servicios.servicioGelificadas);
                break;
            default:
                alert("Has ingresado una opción inválida, por favor vuelve a elegir.");
        }
    }

    let total = 0;
    for (let i = 0; i < serviciosSeleccionados.length; i++) {
        total += serviciosSeleccionados[i];
    }

    alert(`Total a pagar: $${total}`);

    // Opciones de forma de pago

    let formaDePago = prompt("Elige una forma de pago: \n1. Efectivo \n2. Tarjeta de Crédito \n3. Transferencia Bancaria");
    switch (formaDePago) {
        case '1':
            alert("Has elegido pagar en efectivo.");
            break;
        case '2':
            alert("Has elegido pagar con tarjeta de crédito.");
            break;
        case '3':
            alert("Has elegido pagar por transferencia bancaria.");
            break;
        default:
            alert("Has ingresado una opción inválida.");
    }

    alert ("¡ Gracias por elegirnos !. Cualquier duda que tengas, no dudes de contactarnos.")
}

seleccionarServicios();

