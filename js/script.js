let shopContent = document.getElementById("shopContent");
const modalCont = document.getElementById ("modal-cont")
const verCarrito = document.getElementById ("verCarrito");

// Array de objetos

const productos = [
    {
        id: 1,
        nombre: "Manicuria",
        precio: 3000,
        img: "./img/manicuria.jpg", 
    },

    {
        id: 2,
        nombre: "Semipermanente",
        precio: 4500,
        img: "./img/semipermanente.jpg", 
    },

    {
        id: 3,
        nombre: "Gelificadas",
        precio: 11500,
        img: "./img/gelificadas.jpg",
    },

    {
        id: 4,
        nombre: "kapping",
        precio: 8500,
        img: "./img/kapping.jpg",
    },

];

// Creo elemento DIV para mis productos del Array + función
let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="precio" >${product.precio} $</p>
    `;

    shopContent.append(content);

    //Se crea boton de compra y su función

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{
        carrito.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            img: product.img,
        }); 
        
        // 
        localStorage.setItem("carrito", JSON.stringify(carrito));

    });
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
        modalCont.style.display = "none";
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
    totalCompra.innerHTML = `total a pagar:· ${total}`;
    modalCont.append(totalCompra);


});

