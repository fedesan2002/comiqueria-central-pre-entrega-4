const catalogo = [
    "Batman",
    "Spider-Man",
    "Jujutsu Kaisen",
    "Vinland Saga",
    "One Piece"
];



function modificarCatalogo() {


    catalogo.push("Dandadan");

   
    catalogo.unshift("Kagurabachi");

    
    const eliminadoFinal = catalogo.pop();
    console.log(`Se ha eliminado el elemento: ${eliminadoFinal}`);


    catalogo.unshift("Chainsaw Man");


    const eliminadoInicio = catalogo.shift();
    console.log(`Se eliminó del inicio: ${eliminadoInicio}`);


    const indiceModificar = 2;
    const productoAnterior = catalogo[indiceModificar];

    catalogo.splice(indiceModificar, 1, "Daredevil");

    console.log(
        `Se reemplazó "${productoAnterior}" por "${catalogo[indiceModificar]}"`
    );

    
    catalogo.push("Dandadan");
}



function obtenerReporteCatalogo(lista) {

    let mensaje = "CATÁLOGO DISPONIBLE\n\n";

    for (const producto of lista) {
        mensaje += `Producto: ${producto}\n`;
    }

    console.log(mensaje);

    return mensaje;
}



function buscarProducto(nombreBuscado) {

    const nombresMinuscula = [];

    for (const producto of catalogo) {
        nombresMinuscula.push(producto.toLowerCase());
    }

    const busqueda = nombreBuscado.trim().toLowerCase();

    if (nombresMinuscula.includes(busqueda)) {

        const posicion = nombresMinuscula.indexOf(busqueda);

        return {
            existe: true,
            posicion: posicion,
            nombre: catalogo[posicion]
        };
    }

    return {
        existe: false,
        posicion: -1,
        nombre: ""
    };
}


function renderizarCatalogo() {

    const contenedor = document.getElementById("productosGrid");

    let html = "";
    let indice = 0;

    for (const producto of catalogo) {

        const nombreSeguro = JSON.stringify(producto);

        html += `
            <article
                class="product-card"
                id="producto-${indice}"
            >
                <div class="product-cover cover-${indice % 6}">
                    <span>${producto}</span>
                </div>

                <div class="product-info">
                    <span class="product-category">CÓMIC / MANGA</span>
                    <h3>${producto}</h3>
                    <p class="price">$8.500</p>

                    <button
                        type="button"
                        onclick='agregarAlCarrito(${nombreSeguro})'
                    >
                        Agregar al carrito
                    </button>
                </div>
            </article>
        `;

        indice++;
    }

    contenedor.innerHTML = html;
}
