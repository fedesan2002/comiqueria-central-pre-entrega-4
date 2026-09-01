const NOMBRE_TIENDA = "Comiquería Central";
const PRECIO_UNITARIO = 8500;

let carrito = [];


const calcularSubtotal = (cantidad, precio) => cantidad * precio;



function calcularDescuento(cantidad, subtotal) {

    if (cantidad >= 3) {
        return subtotal * 0.10;
    }

    if (cantidad === 2) {
        return subtotal * 0.05;
    }

    return 0;
}



function agregarAlCarrito(nombreProducto) {

    carrito.push(nombreProducto);

    actualizarCarrito();
    abrirCarrito();
}


function quitarUnaUnidad(nombreProducto) {

    const posicion = carrito.indexOf(nombreProducto);

    if (posicion !== -1) {
        carrito.splice(posicion, 1);
    }

    actualizarCarrito();
}


function eliminarProductoDelCarrito(nombreProducto) {

    while (carrito.includes(nombreProducto)) {

        const posicion = carrito.indexOf(nombreProducto);
        carrito.splice(posicion, 1);
    }

    actualizarCarrito();
}


function vaciarCarrito() {

    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    carrito.splice(0, carrito.length);

    actualizarCarrito();
}


function contarProducto(nombreProducto) {

    let cantidad = 0;

    for (const producto of carrito) {

        if (producto === nombreProducto) {
            cantidad++;
        }
    }

    return cantidad;
}


function obtenerProductosUnicos() {

    const productosUnicos = [];

    for (const producto of carrito) {

        if (!productosUnicos.includes(producto)) {
            productosUnicos.push(producto);
        }
    }

    return productosUnicos;
}


function actualizarCarrito() {

    const contador = document.getElementById("cantidadCarrito");
    const contenido = document.getElementById("carritoContenido");
    const totalElemento = document.getElementById("totalCarrito");

    contador.textContent = carrito.length;

    const total = carrito.length * PRECIO_UNITARIO;

    totalElemento.textContent = `$${total.toLocaleString("es-AR")}`;

    if (carrito.length === 0) {

        contenido.innerHTML = `
            <p class="empty-cart">
                Todavía no agregaste ningún producto.
            </p>
        `;

        return;
    }

    const productosUnicos = obtenerProductosUnicos();

    let html = "";

    for (const producto of productosUnicos) {

        const cantidad = contarProducto(producto);
        const subtotal = calcularSubtotal(cantidad, PRECIO_UNITARIO);
        const nombreSeguro = JSON.stringify(producto);

        html += `
            <div class="cart-item">

                <div>
                    <h3>${producto}</h3>
                    <p class="cart-item-price">
                        $${PRECIO_UNITARIO.toLocaleString("es-AR")} c/u
                    </p>
                </div>

                <div class="cart-subtotal">
                    $${subtotal.toLocaleString("es-AR")}
                </div>

                <div class="cart-item-controls">

                    <button
                        class="quantity-btn"
                        type="button"
                        onclick='quitarUnaUnidad(${nombreSeguro})'
                    >
                        −
                    </button>

                    <span class="quantity">${cantidad}</span>

                    <button
                        class="quantity-btn"
                        type="button"
                        onclick='agregarAlCarrito(${nombreSeguro})'
                    >
                        +
                    </button>

                    <button
                        class="remove-btn"
                        type="button"
                        onclick='eliminarProductoDelCarrito(${nombreSeguro})'
                    >
                        Eliminar
                    </button>

                </div>

            </div>
        `;
    }

    contenido.innerHTML = html;
}


function abrirCarrito() {

    document.getElementById("carritoPanel").classList.add("open");
    document.getElementById("carritoOverlay").classList.add("visible");
    document.body.classList.add("cart-open");
}


function cerrarCarrito() {

    document.getElementById("carritoPanel").classList.remove("open");
    document.getElementById("carritoOverlay").classList.remove("visible");
    document.body.classList.remove("cart-open");
}


function finalizarCompra() {

    if (carrito.length === 0) {

        alert("Agregá al menos un producto antes de finalizar la compra.");

        return;
    }

    const total = carrito.length * PRECIO_UNITARIO;

    alert(
        `Compra simulada correctamente.\n\n` +
        `Productos: ${carrito.length}\n` +
        `Total: $${total.toLocaleString("es-AR")}`
    );

    carrito.splice(0, carrito.length);

    actualizarCarrito();
    cerrarCarrito();
}




function buscarDesdeWeb() {

    const input = document.getElementById("buscarInput");
    const mensaje = document.getElementById("mensajeBusqueda");

    const texto = input.value.trim();

    if (texto === "") {

        mensaje.textContent = "Escribí el nombre de un producto para buscar.";
        mensaje.className = "search-message error";

        return;
    }

    const resultado = buscarProducto(texto);

    document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.remove("highlight");
    });

    if (resultado.existe) {

        mensaje.textContent =
            `${resultado.nombre} está disponible en el índice ${resultado.posicion}.`;

        mensaje.className = "search-message ok";

        const card = document.getElementById(
            `producto-${resultado.posicion}`
        );

        if (card) {

            card.classList.add("highlight");

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return;
    }

    mensaje.textContent =
        `"${texto}" no se encuentra en el catálogo.`;

    mensaje.className = "search-message error";
}



function iniciarSimulador() {

    alert(`Bienvenido a ${NOMBRE_TIENDA}`);

    const reporte = obtenerReporteCatalogo(catalogo);

    let productoIngresado = prompt(
        `${reporte}\nEscribí el producto que querés comprar:`
    );

    if (
        productoIngresado === null ||
        productoIngresado.trim() === ""
    ) {

        alert("Operación cancelada.");

        return;
    }

    const resultado = buscarProducto(productoIngresado);

    if (!resultado.existe) {

        alert(
            `${productoIngresado} no se encuentra en el catálogo.`
        );

        return;
    }

    alert(
        `${resultado.nombre} está disponible.\n` +
        `Se encuentra en el índice ${resultado.posicion}.`
    );

    let cantidad = parseInt(
        prompt("¿Cuántas unidades querés comprar?")
    );

    while (
        isNaN(cantidad) ||
        cantidad <= 0
    ) {

        cantidad = parseInt(
            prompt("Ingresá una cantidad válida mayor a 0:")
        );
    }

    const subtotal = calcularSubtotal(
        cantidad,
        PRECIO_UNITARIO
    );

    const descuento = calcularDescuento(
        cantidad,
        subtotal
    );

    const total = subtotal - descuento;

    const mensaje = `
RESUMEN DE COMPRA

Producto: ${resultado.nombre}
Cantidad: ${cantidad}
Subtotal: $${subtotal.toLocaleString("es-AR")}
Descuento: $${descuento.toLocaleString("es-AR")}
Total: $${total.toLocaleString("es-AR")}
`;

    alert(mensaje);
    console.log(mensaje);

    let unidadesAgregadas = 0;

    while (unidadesAgregadas < cantidad) {

        carrito.push(resultado.nombre);

        unidadesAgregadas++;
    }

    actualizarCarrito();
    abrirCarrito();

    return mensaje;
}


// ======================
// INICIO
// ======================

document.addEventListener("DOMContentLoaded", function () {

    // IMPORTANTE:
    // Se modifica el catálogo una sola vez al cargar la página.
    modificarCatalogo();

    renderizarCatalogo();
    actualizarCarrito();

    console.log("Catálogo preparado:");
    console.log(catalogo);

    document
        .getElementById("buscarBtn")
        .addEventListener("click", buscarDesdeWeb);

    document
        .getElementById("buscarInput")
        .addEventListener("keydown", function (evento) {

            if (evento.key === "Enter") {
                buscarDesdeWeb();
            }
        });

    document
        .getElementById("abrirCarritoBtn")
        .addEventListener("click", abrirCarrito);

    document
        .getElementById("navCarritoBtn")
        .addEventListener("click", abrirCarrito);

    document
        .getElementById("cerrarCarritoBtn")
        .addEventListener("click", cerrarCarrito);

    document
        .getElementById("carritoOverlay")
        .addEventListener("click", cerrarCarrito);

    document
        .getElementById("vaciarCarritoBtn")
        .addEventListener("click", vaciarCarrito);

    document
        .getElementById("finalizarCompraBtn")
        .addEventListener("click", finalizarCompra);

    document
        .getElementById("iniciarSimuladorBtn")
        .addEventListener("click", iniciarSimulador);
});
