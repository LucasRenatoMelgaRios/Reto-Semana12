const canastaButton = document.querySelector('.canastaButton');
const canastaContainer = document.querySelector('.canasta');
const listaDeProductos = document.querySelector('.menuGridContainer');
const elementoApintar = document.querySelector('.elementoApintar');
const borrarElemento = document.querySelector('botonBorrar');


let hamburguesasElegidasCanasta = [];

canastaButton.addEventListener('click', () => {

    const canastaAbierta = canastaContainer.style.display === 'block'

    if(canastaAbierta){
        canastaContainer.style.display = 'none'
    } else{
        canastaContainer.style.display = 'block'   
    } 
    
})

//LLISTENERS
loadListeners();

function loadListeners(){
    listaDeProductos.addEventListener('click', agregarAlCarrito)
}

function agregarAlCarrito(e){
    e.preventDefault();

    if(e.target.classList.contains('añadir')){
        const hamburguesaElegida = e.target.parentElement.parentElement;

        leerProductosCanasta(hamburguesaElegida)
    }
}

function leerProductosCanasta(hamburguesaElegida) {
    const dataHamburguesaElegida = {
        title: hamburguesaElegida.querySelector('h2').textContent,
        precio: hamburguesaElegida.querySelector('span').textContent,
        id: hamburguesaElegida.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    };

    const exist = hamburguesasElegidasCanasta.some(hamburguesa => hamburguesa.id === dataHamburguesaElegida.id);

    if (exist) {
        hamburguesasElegidasCanasta.forEach(hamburguesa => {
            if (hamburguesa.id === dataHamburguesaElegida.id) {
                hamburguesa.cantidad++;
            }
        });
    } else {
        hamburguesasElegidasCanasta.push(dataHamburguesaElegida);
    }

    // Guardando todo en el en localstorage
    localStorage.setItem('hamburguesasElegidasCanasta', JSON.stringify(hamburguesasElegidasCanasta));

    pintarHamburguesasElegidas();
}



function pintarHamburguesasElegidas() {
    console.log(hamburguesasElegidasCanasta);
    limpiarContenedorCanasta();
    hamburguesasElegidasCanasta.forEach((hamburguesaitem, index) => {

        const fila = document.createElement("div");
        fila.innerHTML = `
            <div>${hamburguesaitem.cantidad}</div>
            <div>${hamburguesaitem.title}</div>
            <div>${hamburguesaitem.precio}</div>
            <button class="botonBorrar"><img src="./images/borrar.png" class="iconBorrar"></button>
        `;
        fila.classList.add("fila");
        elementoApintar.appendChild(fila);

        const botonBorrar = fila.querySelector('.botonBorrar');
        botonBorrar.addEventListener('click', () => {
            hamburguesasElegidasCanasta.splice(index, 1);
            localStorage.setItem('hamburguesasElegidasCanasta', JSON.stringify(hamburguesasElegidasCanasta)); // Actualizar localStorage
            fila.remove();
        });

    });
}



function limpiarContenedorCanasta (){
    while (elementoApintar.firstChild) {
        elementoApintar.removeChild(elementoApintar.firstChild);
    } }

window.addEventListener('DOMContentLoaded', () => {
        // Recuperar elementos de la canasta desde el localStorage al cargar la página
        const canastaFromStorage = JSON.parse(localStorage.getItem('hamburguesasElegidasCanasta'));
        if (canastaFromStorage) {
            hamburguesasElegidasCanasta = canastaFromStorage;
            pintarHamburguesasElegidas();
        }
    });
    