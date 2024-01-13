let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cosasDelCarrito = document.getElementById("cosasDelCarrito");
let botonCartera = document.getElementById("botonCartera");
let botonBilletera = document.getElementById("botonBilletera");
let botonZapatos = document.getElementById("botonZapatos");
let botonZapatillas = document.getElementById("botonZapatillas");
let botonTotal = document.getElementById("botonTotal");
let botonReset = document.getElementById("botonReset");
let infoTotal = document.getElementById("infoTotal")
let botonRecuperarCarrito = document.getElementById("botonRecuperarCarrito");


function agregarCarrito(nombre, precio) {
    const productos = {
        nombre: nombre,
        precio: precio
    };
    

    carrito.push(productos);

    cosasDelCarrito.innerHTML = "";

    carrito.forEach(producto => {
        let listaCarrito = document.createElement("li");
        listaCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        cosasDelCarrito.appendChild(listaCarrito);
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonCartera.addEventListener("click", function() {
    agregarCarrito('cartera', 3000);
});
botonBilletera.addEventListener("click", function() {
    agregarCarrito('Billetera', 550);
});
botonZapatos.addEventListener("click", function() {
    agregarCarrito('Zapatos', 2200);
});
botonZapatillas.addEventListener("click", function() {
    agregarCarrito('Zapatillas', 1700);
});

function mostrarTotal() {
let total = carrito.reduce((acum, producto)=> acum + producto.precio, 0)
 let agregarTotal = document.createElement("h2")
 agregarTotal.textContent = (`Tu total es $${total}`)
 infoTotal.innerHTML = "";
 infoTotal.appendChild(agregarTotal)
 localStorage.setItem("total", JSON.stringify(total))
}
function vaciarCarrito() {
    carrito = [];
    cosasDelCarrito.innerHTML = "";
    infoTotal.innerHTML = ""; 
    localStorage.clear();
}
function recuperarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    cosasDelCarrito.innerHTML = "";
    carrito.forEach(producto => {
        let listaCarrito = document.createElement("li");
        listaCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        cosasDelCarrito.appendChild(listaCarrito);
    });
}

botonTotal.addEventListener("click", mostrarTotal);
botonReset.addEventListener("click", vaciarCarrito);
botonRecuperarCarrito.addEventListener("click", recuperarCarrito); 