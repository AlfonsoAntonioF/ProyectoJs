// variables
const EstanteriaGuias = [];
const EstanteriaExamenes = [];
let productosCarrito = [];
let GuiasTotales = 0;
let ExamenesTotales = 0;
let op;
// Variables de captura DOM
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let coincidenciasDiv = document.getElementById("coincidencias")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let containerGuias = document.getElementById("Guias");
let formCargarLibro = document.getElementById("formCargarLibro")
// clases
class Guias {
  constructor(id, titulo, precio, area, img) {
    (this.id = id),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.area = area),
      (this.img = img);
  }

  MostrarInfoGuia() {
    console.log(
      `La guia  ${this.titulo} con id:${this.id} pertenece al area ${this.area} y su precio es $${this.precio}`
    );
  }
}
class ExamenesSimulacion {
  constructor(id, titulo, precio, area, img) {
    //atributos-propiedades
    (this.id = id),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.area = area),
      (this.img = img);
  }
  //métodos en class se declaran por fuera del constructor
  MostrarInfoGuia() {
    console.log(
      `Examen  ${this.titulo} con id:${this.id} pertenece al area ${this.area} y su precio es $${this.precio}`
    );
  }
}
const Guia1 = new Guias(
  1,
  "Guia de preparacion para el examen de admision Basico",
  172.8,
  "Ing y Ciencias Exactas",
  "ICEBas.png"
);
const Guia2 = new Guias(
  2,
  "Guia de preparacion para el examen de admision Basico",
  152.75,
  "Ciencias Biologicas , Quimicas y de la salud",
  "ICEBas.png"
);
const Guia3 = new Guias(
  3,
  "Guia de preparacion para el examen de admision Basico",
  158.25,
  "Ciencias Sociales",
  "ICEBas.png"
);
const Guia4 = new Guias(
  4,
  "Guia de preparacion para el examen de admision Basico",
  145.9,
  "Humanidades y de las Artes",
  "ICEBas.png"
);

const Examen1 = new ExamenesSimulacion(
  1,
  "Examen de simulacion Basico",
  175.6,
  "Ing y ciencias Exactas",
  "../assets/img/ICEBas.png"
);
const Examen2 = new ExamenesSimulacion(
  2,
  "Examen de simulacion Basico",
  145.65,
  "Ciensias Biologicas, Quimicas y de la salud",
  "../assets/img/ICEBas.png"
);
const Examen3 = new ExamenesSimulacion(
  3,
  "Examen de simulacion Basico",
  156.85,
  "Ciencias Sociales",
  "../assets/img/ICEBas.png"
);
const Examen4 = new ExamenesSimulacion(
  4,
  "Examen de simulacion Basico",
  165.7,
  "Humanidades y de las Artes",
  "../assets/img/ICEBas.png"
);

//EstanteriaGuias.push(Guia1,Guia2,Guia3,Guia4)
//EstanteriaExamenes.push(Examen1,Examen2,Examen3,Examen4)


if (localStorage.getItem("EstanteriaGuias")) {
  // estanteria = JSON.parse(localStorage.getItem("estanteria"))
  //hacer for of de estanteria y pasarle new Libro
  for (let Guia of JSON.parse(localStorage.getItem("EstanteriaGuias"))) {
    let libroStorage = new Guias(
      Guia.id,
      Guia.titulo,
      Guia.precio,
      Guia.area,
      Guia.img
    );
    EstanteriaGuias.push(libroStorage);
  }
} else {
  //no existe seteamos porprimera vez
  console.log("seteamos por primera vez");
  EstanteriaGuias.push(Guia1, Guia2, Guia3, Guia4);
  localStorage.setItem("EstanteriaGuias", JSON.stringify(EstanteriaGuias));
}

function mostrarCatalogoDOM(array) {
  //resetear el container
  containerGuias.innerHTML = "";
  //for of: para recorrer un array posición a posición id, titulo, precio, area, img
  for (let Guia of array) {
    let libroNuevoDiv = document.createElement("div");
    libroNuevoDiv.className = "col-12 col-md-6 col-lg-4 my-2";
    libroNuevoDiv.innerHTML = `
            <div id="${Guia.id}" class="card" >
                    <img class="card-img-top img-fluid" style="height: 200px;"src= "../assets/img/${Guia.img}" alt="${Guia.titulo} de ${Guia.area} ">
                    <div class="card-body">
                        <h4 class="card-title"></h4>
                        <p>Area: ${Guia.area}</p>
                        <p>${Guia.titulo}</p>
                        <p class="$${
                          Guia.precio <= 3000 && "oferta"
                        }">Precio: $${Guia.precio} M/N</p>
                    <button id="agregarBtn${
                      Guia.id
                    }" class="btn btn-outline-success">Agregar al carrito</button>
                    </div>
        </div> `;
    containerGuias.append(libroNuevoDiv);
    let agregarBtn = document.getElementById(`agregarBtn${Guia.id}`)
    console.log(agregarBtn);
    agregarBtn.addEventListener("click", () => {
      //console.log("Funciona " + Guia.titulo);
      //dentro del for of libro es mi objeto
      //productosCarrito.push(Guia);
      //console.log(productosCarrito);
      agregarAlCarrito(Guia)
    })
  }
}
 
function agregarLibro(array){
  
  let titulo = document.getElementById("tituloInput")
  let precio = document.getElementById("precioInput")
  let area = document.getElementById("areaInput")
  //instanciarlo en un objeto:
  const nuevoLibro = new Guias (array.length+1,titulo.value, parseInt(precio.value),area.value, "ICEBas.png")
  array.push(nuevoLibro)  
  area.value =""
  titulo.value =""
  precio.value ="" 
    
  // formCargarLibro.reset()  
  //SETEAR STORAGE 
  localStorage.setItem("EstanteriaGuias", JSON.stringify(EstanteriaGuias))
}
// Buscar guia 
function busquedaDatos(elementoBusqueda,array){
  let coincidencias = array.filter(
    (Guia) => {
      return Guia.titulo.toLowerCase().includes(elementoBusqueda.toLowerCase()) || Guia.titulo.toLowerCase().includes(elementoBusqueda.toLowerCase())
    }
  )
  coincidencias.length > 0 ? ( mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML=""  ): ( mostrarCatalogoDOM(array),coincidenciasDiv.innerHTML =  `<h3> No hay coincidencias con su búsqueda, revise nuestro catalogo completo</h3>` )

}

function agregarAlCarrito(Producto){
  let guiaAgregada = productosCarrito.find((Guia) => Guia.id == Producto.id)
  guiaAgregada == undefined ? (
    productosCarrito.push(Producto),
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito)),
    console.log(productosCarrito)):
    console.log(`La Guia ${Producto.titulo} ya existe en el carrito`)
}

function cargarProductosCarrito(array){
  modalBodyCarrito.innerHTML = ""
  array.forEach(
      (productoCarrito) => {
          modalBodyCarrito.innerHTML += `
          <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
               <img class="card-img-top" height="300px" src="../assets/img/${productoCarrito.img}" alt="">
               <div class="card-body">
                      <h4 class="card-title">${productoCarrito.titulo}</h4>
                      <p class="card-text">${productoCarrito.area}</p>
                       <p class="card-text">$${productoCarrito.precio}</p> 
                       <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
               </div>    
          </div>
          `
      }
  )
  calcularTotal(array)    
}


function calcularTotal(array){
  //function con spread (no necesariamente debe ser así)
  
  const totalReduce = array.reduce(
      //dos parámetros: funcion e inicio de valor del acumulador
      //atención que si su carrito maneja cantidad, debe ser precio *cantidad
      (acumulador, Guia)=>
      {return acumulador + Guia.precio},
      0
  )
  totalReduce > 0 ? precioTotal.innerHTML = `<strong>El total de su compra es: ${totalReduce}</strong>` : precioTotal.innerHTML = `No hay productos en el carrito` 
  //equivalentes:
  // totalReduce == 0 ? precioTotal.innerHTML = `No hay productos en el carrito`  : precioTotal.innerHTML = `<strong>El total de su compra es: ${totalReduce}</strong>`
}

//Funcion para ordenar con base al precio 

function ordenarMayorAMenor(array){
  let arrayMayor = array.concat()
  arrayMayor.sort(
    (a,b) => b.precio - a.precio
  )
  mostrarCatalogoDOM(arrayMayor)
}

function ordenarMenorAMayor(array){
  let arrayMenor = array.concat()
  arrayMenor.sort(
    (a,b) => a.precio - b.precio
  )
  mostrarCatalogoDOM(arrayMenor)

}


function ordenarAlfabeticamenteTitulo(array){
  let arrayAlfabetico = array.concat()
  arrayAlfabetico.sort(
    (a,b) => {
      if (a.titulo < b.titulo) {return -1}
      if (a.titulo > b.titulo) {return 1}
      return 0
    }
  )
  mostrarCatalogoDOM(arrayAlfabetico)
}




//Eventos 
guardarLibroBtn.addEventListener("click",() => {
  agregarLibro(EstanteriaGuias)
  mostrarCatalogoDOM(EstanteriaGuias)
}
)

buscador.addEventListener("input", () => {
  console.log(buscador.value)
  busquedaDatos(buscador.value,EstanteriaGuias)
})

botonCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosCarrito)
})
selectOrden.addEventListener("change", () => {
  switch (selectOrden.value) {
    case "1":
      ordenarMayorAMenor(EstanteriaGuias)
    break
    case "2":
      ordenarMenorAMayor(EstanteriaGuias)
    break
    case "3":
      ordenarAlfabeticamenteTitulo(EstanteriaGuias)
    break
    default:
      mostrarCatalogoDOM(EstanteriaGuias)

  }
});

//CÓDIGO
mostrarCatalogoDOM(EstanteriaGuias);
