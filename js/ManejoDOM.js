// variables
const EstanteriaGuias = [];
const EstanteriaExamenes = [];
let productosCarrito = [];
let GuiasTotales = 0;
let ExamenesTotales = 0;
let op;
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
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

//CAPTURA DOM
let containerGuias = document.getElementById("Guias");

function mostrarCatalogoDOM(array) {
  //resetear el container
  containerGuias.innerHTML = "";
  //for of: para recorrer un array posición a posición id, titulo, precio, area, img
  for (let libro of array) {
    let libroNuevoDiv = document.createElement("div");
    libroNuevoDiv.className = "col-12 col-md-6 col-lg-4 my-2";
    libroNuevoDiv.innerHTML = `
            <div id="${libro.id}" class="card" >
                    <img class="card-img-top img-fluid" style="height: 200px;"src= "../assets/img/${libro.img}" alt="${libro.titulo} de ${libro.area} ">
                    <div class="card-body">
                        <h4 class="card-title"></h4>
                        <p>Area: ${libro.area}</p>
                        <p>${libro.titulo}</p>
                        <p class="$${
                          libro.precio <= 3000 && "oferta"
                        }">Precio: $${libro.precio} M/N</p>
                    <button id="agregarBtn${
                      libro.id
                    }" class="btn btn-outline-success">Agregar al carrito</button>
                    </div>
        </div> `;
    containerGuias.append(libroNuevoDiv);
    let agregarBtn = document.getElementById(`agregarBtn${libro.id}`);
    console.log(agregarBtn);
    agregarBtn.addEventListener("click", () => {
      console.log("Funciona " + libro.titulo);
      //dentro del for of libro es mi objeto
      productosCarrito.push(libro);
      console.log(productosCarrito);
    });
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

function agregarCarrito(Producto){
  let guiaAgregada = productosCarrito.find((Guia) => Guia.id == Producto.id)
  guiaAgregada == undefined ? (
    productosCarrito.push(Producto),
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito)),
    console.log(productosCarrito)):
    console.log(`La Guia ${Producto.titulo} ya existe en el carrito`)
}

//Eventos 
guardarLibroBtn.addEventListener("click",() => {
  agregarLibro(EstanteriaGuias)
  mostrarCatalogoDOM(EstanteriaGuias)
}
)
//CÓDIGO
mostrarCatalogoDOM(EstanteriaGuias);
