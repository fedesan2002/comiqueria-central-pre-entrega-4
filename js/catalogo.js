const catalogo = [
    "Batman",
    "Spider-Man",
    "Jujutsu Kaisen",
    "Vinland Saga",
    "One Piece"
];

function modificarCatalogo() {
    catalogo.push("Dandadan");
    console.log("Se agregó Dandadan al final");

    catalogo.unshift("Kagurabachi");
    console.log("Se agregó Kagurabachi al principio");

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
}

function mostrarCatalogo(lista) {
    let mensaje = "CATÁLOGO DISPONIBLE\n\n";

    for (const comic of lista) {
        mensaje += `Producto: ${comic}\n`;
    }

    alert(mensaje);
    console.log(mensaje);

    return mensaje;
}

function buscarProducto(nombre) {
    if (catalogo.includes(nombre)) {
        const posicion = catalogo.indexOf(nombre);

        alert(`${nombre} está disponible.\nÍndice: ${posicion}`);

        return true;
    }

    alert(`${nombre} no se encuentra en el catálogo.`);

    return false;
}
