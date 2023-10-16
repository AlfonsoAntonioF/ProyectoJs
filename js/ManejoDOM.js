// variables
const EstanteriaGuias = [];
let op;
// Variables de captura DOM
let guardarGuiaBtn = document.getElementById("guardarGuiaBtn");
let buscador = document.getElementById("buscador");
let coincidenciasDiv = document.getElementById("coincidencias");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let totalCompra = document.getElementById("totalCompra");
let containerGuias = document.getElementById("Guias");
let formCargarGuia = document.getElementById("formCargarGuia");
let btnFinalizaCompra = document.getElementById("botonFinalizarCompra");
let selectOrdenarGuia = document.getElementById("selectOrden");
let loaderTexto = document.getElementById("loaderTexto");
let loader = document.getElementById("loader");

let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) ?? [];

// clases
class Guias {
  constructor(id, titulo, area, paquete, precio, img) {
    (this.id = id),
      (this.titulo = titulo),
      (this.area = area),
      (this.paquete = paquete),
      (this.precio = precio),
      (this.img = img);
  }
}

const CargarEstanteriaGuias = async () => {
  const resp = await fetch("../js/guias.json");
  const dataGuia = await resp.json();
  for (let guia of dataGuia) {
    let nuevaGuia = new Guias(
      guia.id,
      guia.titulo,
      guia.area,
      guia.paquete,
      guia.precio,
      guia.img
    );
    EstanteriaGuias.push(nuevaGuia);
  }
  localStorage.setItem("EstanteriaGuias", JSON.stringify(EstanteriaGuias));
};

if (localStorage.getItem("EstanteriaGuias")) {
  for (let guia of JSON.parse(localStorage.getItem("EstanteriaGuias"))) {
    let guiaStorage = new Guias(
      guia.id,
      guia.titulo,
      guia.area,
      guia.paquete,
      guia.precio,
      guia.img
    );
    EstanteriaGuias.push(guiaStorage);
  }
} else {
  console.log("Se Setea por primera vez ");
  CargarEstanteriaGuias();
}



// Funcion para mostrar los productos en el html
function mostrarCatalogoGuias(array) {
  console.log(array);
  containerGuias.innerHTML = "";
  for (let Guia of array) {
    let guiaNewDiv = document.createElement("div");
    guiaNewDiv.className = "col-12 col-md-6 col-lg-4 my-2";
    guiaNewDiv.innerHTML = `
    <div id="${Guia.id}" class="card" style="width: 80%;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="../assets/img/${
              Guia.img
            }" alt="${Guia.titulo} del area  ${Guia.area} ">
            <div class="card-body">
                <h4 class="card-title"></h4>
                <p>${Guia.titulo}</p>
                <p>Area: ${Guia.area}</p>
                <p>Paquete: ${Guia.paquete}</p>
                <p class="${Guia.precio <= 130 && "oferta"}">Precio: ${
      Guia.precio
    }</p>
            <button id="agregarBtn${
              Guia.id
            }" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
    </div> `;
    containerGuias.append(guiaNewDiv);
    let insertarBtn = document.getElementById(`agregarBtn${Guia.id}`);
    insertarBtn.addEventListener("click", () => {
      agregarProductoCarrito(Guia);
    });
  }
}

function agregarNuevaGuia(array) {
  let titulo = document.getElementById("tituloInput");
  let area = document.getElementById("areaInput");
  let paquete = document.getElementById("paqueteInput");
  let precio = document.getElementById("precioInput");

  const nuevaGuia = new Guias(
    array.length + 1,
    titulo.value,
    area.value,
    paquete.value,
    parseInt(precio.value),
    "ICEBas.png"
  );
  array.push(nuevaGuia);
  titulo.value = "";
  area.value = "";
  paquete.value = "";
  precio.value = "";

  swal.fire({
  
    title: `La guia se ha agregado de forma correcta`,
    text: `La ${nuevaGuia.titulo} se ha agregado de forma exitosa !`,
    imageUrl: `../assets/img/${nuevaGuia.img}`,
    showConfirmButton: false,
    icon:"success",
    timer: 3000,

  });

  localStorage.setItem("EstanteriaGuias", JSON.stringify(EstanteriaGuias));
}

// Buscar guia
function busquedaDatos(elementoBusqueda, array) {
  let coincidencias = array.filter((Guia) => {
    return (
      Guia.titulo.toLowerCase().includes(elementoBusqueda.toLowerCase()) ||
      Guia.titulo.toLowerCase().includes(elementoBusqueda.toLowerCase())
    );
  });
  coincidencias.length > 0
    ? (mostrarCatalogoGuias(coincidencias), (coincidenciasDiv.innerHTML = ""))
    : (mostrarCatalogoGuias(array),
      (coincidenciasDiv.innerHTML = `<h3> No hay coincidencias con su búsqueda, revise nuestro catalogo completo</h3>`));
}

function agregarProductoCarrito(Producto) {
  let ProductoAgregar = productosCarrito.find((guia) => guia.id == Producto.id);

  ProductoAgregar == undefined
    ? (productosCarrito.push(Producto),
      localStorage.setItem(
        "productosCarrito",
        JSON.stringify(productosCarrito)
      ),
      Toastify({
        text: `Has agregado ${Producto.titulo} paquete ${Producto.paquete} a tu carrito de compras`,
        duration: 1000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast())
    : Toastify({
        text: `El articulo ${Producto.titulo} ya existe en su carrito`,
        duration: 2500,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, red, orange)",
          color: "black",
          fontWeight: "bold",
        },
      }).showToast();
}

function CargarProductosalCarrito(array) {
  modalBodyCarrito.innerHTML = "";
  array.forEach((productosCarrito) => {
    modalBodyCarrito.innerHTML += `
    <div class="card border-primary mb-3" id ="productoCarrito${productosCarrito.id}" style="max-width: 600px;">
                 <img class="card-img-top" height="auto"  src="../assets/img/${productosCarrito.img}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productosCarrito.titulo}</h4>
                        <p class="card-text">Area:${productosCarrito.area}</p>
                        <p class="card-text">Paqute:${productosCarrito.paquete}</p>
                         <p class="card-text">$${productosCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productosCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
    </div>    
    `;
  });

  array.forEach((productosCarrito) => {
    document
      .getElementById(`botonEliminar${productosCarrito.id}`)
      .addEventListener("click", () => {
        let cardDelProducto = document.getElementById(
          `productoCarrito${productosCarrito.id}`
        );
        cardDelProducto.remove();

        let posicion = array.indexOf(productosCarrito);
        array.splice(posicion, 1);
        localStorage.setItem("productosCarrito", JSON.stringify(array));
        calcularTotal(array);
      });
  });
  calcularTotal(array);
}

function calcularTotal(array) {
  const Total = array.reduce((acumulador, guia) => {
    return acumulador + guia.precio;
  }, 0);
  Total > 0
    ? (totalCompra.innerHTML = `<strong>Total: $ ${Total}  </strong>`)
    : (totalCompra.innerHTML = `Aun no hay productos en su carrito`);

  return Total;
}

function compraFinalizada(array) {
  let Total = calcularTotal(array);
  swal.fire({
    text: `El monto total de su compra fue de ${Total} \n LoboSimuladorEGA agrdece su preferencia`,
    icon: "success",
  });
  productosCarrito = [];
  localStorage.removeItem("productosCarrito");
}

//Funcion para ordenar con base al precio

function ordenarMayorAMenor(array) {
  let arrayMayor = array.concat();
  arrayMayor.sort((a, b) => b.precio - a.precio);
  mostrarCatalogoGuias(arrayMayor);
}

function ordenarMenorAMayor(array) {
  let arrayMenor = array.concat();
  arrayMenor.sort((a, b) => a.precio - b.precio);
  mostrarCatalogoGuias(arrayMenor);
}

function ordenarAlfabeticamenteTitulo(array) {
  let arrayAlfabetico = array.concat();
  arrayAlfabetico.sort((a, b) => {
    if (a.titulo < b.titulo) {
      return -1;
    }
    if (a.titulo > b.titulo) {
      return 1;
    }
    return 0;
  });
  mostrarCatalogoGuias(arrayAlfabetico);
}

//Eventos
guardarGuiaBtn.addEventListener("click", () => {
  agregarNuevaGuia(EstanteriaGuias);
  mostrarCatalogoGuias(EstanteriaGuias);
});

buscador.addEventListener("input", () => {
  console.log(buscador.value);
  busquedaDatos(buscador.value, EstanteriaGuias);
});

botonCarrito.addEventListener("click", () => {
  CargarProductosalCarrito(productosCarrito);
});

btnFinalizaCompra.addEventListener("click", () => {
  compraFinalizada(productosCarrito);
});

selectOrdenarGuia.addEventListener("change", () => {
  switch (selectOrdenarGuia.value) {
    case "1":
      ordenarMayorAMenor(EstanteriaGuias);
      break;
    case "2":
      ordenarMenorAMayor(EstanteriaGuias);
      break;
    case "3":
      ordenarAlfabeticamenteTitulo(EstanteriaGuias);
      break;
    default:
      mostrarCatalogoGuias(EstanteriaGuias);
  }
});

//CÓDIGO

setTimeout(() => {
  loaderTexto.innerHTML = `Estan son todas Nuestras Guias`;
  loader.remove();
  mostrarCatalogoGuias(EstanteriaGuias);
}, 2500);

mostrarCatalogoGuias(EstanteriaGuias);
// mostrarCatalogoDOM(EstanteriaGuias);
// mostrarCatalogoDOMExamen(EstanteriaExamenes);
