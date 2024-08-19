let shopContent1 = document.getElementById("shopContent1");
let shopContent2 = document.getElementById("shopContent2");
const modalCont = document.getElementById ("modal-cont")
const verCarrito = document.getElementById ("verCarrito");


// Creo elemento DIV para mis productos del Array + función
let carrito = [];


// Cargar productos desde el archivo JSON
fetch('./db/data.json')
    .then(response => response.json())
    .then(productos => {
        productos.forEach((product) => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p class="precio">${product.precio} $</p>
            `;

            shopContent1.append(content);

            // Se crea boton de compra y su función
            let comprar = document.createElement("button");
            comprar.innerText = "Agregar Servicio";
            comprar.className = "Comprar";

            content.append(comprar);

            comprar.addEventListener("click", () => {
                carrito.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    img: product.img,
                });

                localStorage.setItem("carrito", JSON.stringify(carrito));
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

    fetch('./db/estetica.json')
    .then(response => response.json())
    .then(productos => {
        productos.forEach((product) => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p class="precio">${product.precio} $</p>
            `;

            shopContent2.append(content);

            // Se crea boton de compra y su función
            let comprar = document.createElement("button");
            comprar.innerText = "Agregar Servicio";
            comprar.className = "Comprar";

            content.append(comprar);

            comprar.addEventListener("click", () => {
                carrito.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    img: product.img,
                });

                localStorage.setItem("carrito", JSON.stringify(carrito));
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

// Creo un Modal para que se visualice el carrito con los productos seleccionados por el cliente

verCarrito.addEventListener("click", () =>{
    modalCont.innerHTML = "";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h3 class="modal-header-titulo">Carrito</h3>
    `;

    modalCont.append(modalHeader);

    // Se crea elemento para poder eleminar el carrito

    const modalbutton = document.createElement ("h3");
    modalbutton.innerText = "🗑️";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () =>{

    // Mostrar alerta de confirmación con SweetAlert2
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará tu carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            modalCont.style.display = "none";

            // Recargar la página
            location.reload(); 
        }
    });
});



    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3> ${product.nombre} </h3>
        <p> ${product.precio} $</p>
        `;

    modalCont.append(carritoContent);

    });
    
    //Función para total de la compra y se crea elemento html

    const total = carrito.reduce((acc, e) => acc + e.precio, 0);

    const totalCompra = document.createElement ("div")
    totalCompra.className = "total-compra"
    totalCompra.innerHTML = `Total a Pagar:· ${total}`;
    modalCont.append(totalCompra);

    // Registro de compra

    const registrarCompraButton = document.createElement("button");
    registrarCompraButton.innerText = "Registrar Pedido";
    registrarCompraButton.className = "registrar-compra-btn";
    modalCont.append(registrarCompraButton);

    registrarCompraButton.addEventListener("click", () => {
        modalCont.innerHTML= "";

        const formularioCompra = document.createElement("form");
        formularioCompra.className="formulario-compra";
        formularioCompra.innerHTML=`
        
        <label for= "nombre" class="label">Nombre: </label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
        <label for="email" class="label">Email: </label>
        <input type="email" id="email" name=email placeholder="ejemplo@dominio.com" required>
        <label for="telefono" class="label">Número de Teléfono: </label>
        <input type="tel" id="telefono" name="telefono" placeholder="Tu número de telefono" required>
        <button type="submit" class="btn-confirmar" >Confirmar Solicitud </button>
        `;

        modalCont.append(formularioCompra);

        formularioCompra.addEventListener("submit", (e) =>{
            e.preventDefault();

            // Uso de Try-Catch-Finally
            try {

                if (!localStorage) throw new Error("No se pudo acceder al carrito.");
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Se ingresó con éxito tu pedido!!!"
                });

                localStorage.clear();

            } catch (error) {
                const mensajeError = document.createElement("p");
                mensajeError.className = "mensaje-error";
                mensajeError.innerText = "Hubo un problema al procesar su compra. Intente nuevamente.";
                modalCont.append(mensajeError);
            } finally {
                setTimeout(() => {
                    location.reload();
                }, 5000); 
            
            }
            
        });
    });
});

