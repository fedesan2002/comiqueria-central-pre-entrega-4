const NOMBRE_TIENDA = "Comiquería Central";

const PRECIO_UNITARIO = 8500;


// FUNCIÓN FLECHA CON RETORNO IMPLÍCITO
const calcularSubtotal = (cantidad, precio) =>
    cantidad * precio;


// CALCULAR DESCUENTO
function calcularDescuento(
    cantidad,
    subtotal
) {

    if (cantidad >= 3) {

        return subtotal * 0.10;
    }


    if (cantidad === 2) {

        return subtotal * 0.05;
    }


    return 0;
}


// MOSTRAR COMPRA
function mostrarCompra(
    comic,
    cantidad,
    subtotal,
    descuento,
    total
) {

    const mensaje = `
RESUMEN DE COMPRA

Cómic o manga: ${comic}
Cantidad: ${cantidad}
Subtotal: $${subtotal.toFixed(2)}
Descuento: $${descuento.toFixed(2)}
Total: $${total.toFixed(2)}
`;


    alert(mensaje);

    console.log(mensaje);


    return mensaje;
}


// FUNCIÓN PRINCIPAL
function iniciarSimulador() {

    alert(
        `Bienvenido a ${NOMBRE_TIENDA}`
    );


    // Muestra el catálogo.
    // Ya no lo modifica cada vez que inicia.
    mostrarCatalogo(catalogo);


    let comic = prompt(
        "Escribí exactamente el nombre del cómic o manga que querés comprar:"
    );


    if (
        comic === null ||
        comic.trim() === ""
    ) {

        alert("Operación cancelada.");

        return;
    }


    comic = comic.trim();


    // Busca el producto en el array
    if (!buscarProducto(comic)) {

        return;
    }


    let cantidad = parseInt(
        prompt(
            "¿Cuántas unidades querés comprar?"
        )
    );


    // VALIDACIÓN CON WHILE
    while (
        isNaN(cantidad) ||
        cantidad <= 0
    ) {

        cantidad = parseInt(
            prompt(
                "Ingresá una cantidad válida mayor a 0:"
            )
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


    const total =
        subtotal - descuento;


    mostrarCompra(
        comic,
        cantidad,
        subtotal,
        descuento,
        total
    );
}


// SE EJECUTA UNA SOLA VEZ
// CUANDO CARGA LA PÁGINA
document.addEventListener(
    "DOMContentLoaded",
    function () {

        modificarCatalogo();

        console.log(
            "Catálogo preparado:"
        );

        console.log(catalogo);
    }
);
