
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
let encabezado = document.getElementById("encabezado");


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

botonReset.addEventListener("click", vaciarCarrito);
botonRecuperarCarrito.addEventListener("click", recuperarCarrito); 
async function reiniciarDespuesDeCaja(total) {
    try {

        let mensajeTotal = document.createElement("h2");
        mensajeTotal.textContent = `Tu total es $${total}. Preparándose para ir a la caja...`;
        infoTotal.innerHTML = "";
        infoTotal.appendChild(mensajeTotal);

    
        await new Promise(resolve => setTimeout(resolve, 3000));


        carrito = [];
        cosasDelCarrito.innerHTML = "";
        infoTotal.innerHTML = "";

    
        Swal.fire({
            title: "¡Gracias por tu compra!",
            text: "Esperamos verte de nuevo pronto.",
            icon: "success"
        });
    } catch (error) {
        console.error("Error durante el reinicio después de ir a la caja:", error);
    }
}


botonTotal.addEventListener("click", async function() {

    const total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    mostrarTotal();

  
    await reiniciarDespuesDeCaja(total);
});

async function mostrarHoraLocalEnDOM() {
    try {
        const respuesta = await fetch('http://worldtimeapi.org/api/ip');
        const datos = await respuesta.json();

        const fechaHoraLocal = new Date(datos.datetime);
        const opcionesFormato = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            timeZoneName: 'short' 
        };
        const horaLocalFormateada = fechaHoraLocal.toLocaleString('es-ES', opcionesFormato);
        const elementoHoraLocal = document.createElement("h2");
        elementoHoraLocal.textContent = `Hora local: ${horaLocalFormateada}`;
        encabezado.appendChild(elementoHoraLocal);
    } catch (error) {
        console.error('Error al obtener la hora local:', error);
    }
}
mostrarHoraLocalEnDOM();