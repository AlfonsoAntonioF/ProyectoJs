// variables
const EstanteriaGuias = [];
const EstanteriaExamenes = [];
let GuiasTotales = 0;
let ExamenesTotales = 0;
let op;
// clases
class Guias {
  constructor(id, titulo, precio, area) {
    (this.id = id),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.area = area);
  }
  
  MostrarInfoGuia() {
    console.log(
      `La guia  ${this.titulo} con id:${this.id} pertenece al area ${this.area} y su precio es $${this.precio}`
    );
  }
}
class ExamenesSimulacion {
  constructor(id, titulo, precio, area) {
    //atributos-propiedades
    (this.id = id),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.area = area);
  }
  //métodos en class se declaran por fuera del constructor
  MostrarInfoGuia() {
    console.log(
      `Examen  ${this.titulo} con id:${this.id} pertenece al area ${this.area} y su precio es $${this.precio}`
    );
  }
}
const Guia1 = new Guias(1,"Guia de preparacion para el examen de admision Basico", 172.80,"Ing y Ciencias Exactas")
const Guia2 = new Guias(2,"Guia de preparacion para el examen de admision Basico", 152.75,"Ciencias Biologicas , Quimicas y de la salud")
const Guia3 = new Guias(3,"Guia de preparacion para el examen de admision Basico", 158.25,"Ciencias Sociales")
const Guia4 = new Guias(4,"Guia de preparacion para el examen de admision Basico", 145.90,"Humanidades y de las Artes")


const Examen1 = new ExamenesSimulacion(1,"Examen de simulacion Basico", 175.60,"Ing y ciencias Exactas")
const Examen2 = new ExamenesSimulacion(2,"Examen de simulacion Basico", 145.65,"Ciensias Biologicas, Quimicas y de la salud")
const Examen3 = new ExamenesSimulacion(3,"Examen de simulacion Basico", 156.85,"Ciencias Sociales")
const Examen4 = new ExamenesSimulacion(4,"Examen de simulacion Basico", 165.70,"Humanidades y de las Artes")

EstanteriaGuias.push(Guia1,Guia2,Guia3,Guia4)
EstanteriaExamenes.push(Examen1,Examen2,Examen3,Examen4)


// Funciones
function menu() {
  let opcion = parseInt(
    prompt(`Porfavor ingrese un valor entero entre 0 y 3 para elegir una opcion \n Ingrese la opción deseada
   1 - Ver disponibilidad de guias y examenes
   2 - Comprar una guia
   3 - Comprar un examen de simulacion
   4 - Comprar una Guía y un examen de simulación
   5 - Agregar una nueva guia
   6 - Agregar un nuevo examen de simulacion 
   7 - Eliminar una guia
   8 - Eliminar un examen de simulación
   9 - Buscar Guia
   10 - Buscar Examen
   0 - Salir del menu`)
  );
  return opcion;
}

function DisponibilidadGuiasExamenes() {
  GuiasTotales = EstanteriaGuias.length;
  ExamenesTotales = EstanteriaExamenes.length;
  let op = parseInt(
    prompt(` Tenemos ${GuiasTotales} guias de estudio disponibles \n 
    Tenemos ${ExamenesTotales} Examenes disponibles\n 
    Para regresar al menu principal precione 5 `)
  );
  mostrarCatalogo(EstanteriaGuias)
  mostrarCatalogo(EstanteriaExamenes)

  return op;
}
function VenderGuia(array) {

  mostrarCatalogo(array);
  GuiasTotales=array.length;
  if (GuiasTotales > 0){
  let idCompra = parseInt(
    prompt(
      "Observar el catalogo de Guias en consola y seleccionar ID de la Guia que desea comprar."
    )
  );
  let coincidencia = false;
  for (let elem of array) {
    if (elem.id == idCompra) {
      //indexOf me devuelve el indice del valor que paso con parámetro // si devuelve -1 no encontro
      let indice = array.indexOf(elem);
      //qué método me permite borrar de un array ubicando posición
      array.splice(indice, 1);
      coincidencia = true;
      console.log(`La ${elem.titulo} con id ${idCompra} se ha vendido con exito`);
      mostrarCatalogo(array);
    }
  }
  if (!coincidencia) {
    console.log(
      `El id ${idCompra} no coincide con ninguna Guia de nuestro catálogo. No se puede realizar la venta`
    );
  }
} else {
    let op = parseInt(
      prompt(
        "Por el momento no contamos con guias en stock\n Para Regresar al menu principal preciona 5"
      )
    );
  }
  return op;
}
function VenderExamen(array) {
  let op;
  mostrarCatalogo(array);
  ExamenesTotales=array.length;
  if (ExamenesTotales > 0){
  let idCompra = parseInt(
    prompt(
      "Observar el catalogo de Examenes en consola y seleccionar ID de la Guia que desea comprar."
    )
  );
  let coincidencia = false;
  for (let elem of array) {
    if (elem.id == idCompra) {
      //indexOf me devuelve el indice del valor que paso con parámetro // si devuelve -1 no encontro
      let indice = array.indexOf(elem);
      //qué método me permite borrar de un array ubicando posición
      array.splice(indice, 1);
      coincidencia = true;
      console.log(`La ${elem.titulo} con id ${idCompra} se ha vendido con exito`);
      mostrarCatalogo(array);
    }
  }
  if (!coincidencia) {
    console.log(
      `El id ${idCompra} no coincide con ningun examen de nuestro catálogo. No se puede realizar la venta`
    );
  }
} else {
    op = parseInt(
      prompt(
        "Por el momento no contamos con Examenes en stock\n Para Regresar al menu principal preciona 5"
      )
    );
  }
  return op;
}

function VenderAmbos() {
  let op;
  if (ExamenesTotales > 0 && GuiasTotales > 0) {
    ExamenesTotales--;
    GuiasTotales--;
    op = parseInt(
      prompt(
        "Examen y Guia Vendido con exito\n Para Regresar al menu principal preciona 5"
      )
    );
  } else if (ExamenesTotales > 0) {
    op = parseInt(
      prompt(
        "Por el momento no contamos con Guias en stock, solo Examenes \n Para Regresar al menu principal preciona 5"
      )
    );
  } else if (GuiasTotales > 0) {
    op = parseInt(
      prompt(
        "Por el momento no contamos con Examenes en stock, solo Guias \n Para Regresar al menu principal preciona 5"
      )
    );
  }
  return op;
}

function AgregarNuevaGuia() {
  //id, titulo, precio, area
  let titulo = prompt("Ingrese el titulo de la Guia");
  let precio = parseInt(prompt(`Ingrese el precio de ${titulo}`));
  let area = prompt("Ingrese le area a la que pertenece la guia");

  const nuevoLibro = new Guias(
    EstanteriaGuias.length + 1,
    titulo,
    precio,
    area
  );
  console.log(nuevoLibro);
  EstanteriaGuias.push(nuevoLibro);
}

function AgregarNuevoExamen() {
  //id, titulo, precio, area
  let titulo = prompt("Ingrese el titulo del Examen");
  let precio = parseInt(prompt(`Ingrese el precio del ${titulo}`));
  let area = prompt("Ingrese le area a la que pertenece el examen");

  const nuevoExamen = new ExamenesSimulacion(
    EstanteriaExamenes.length + 1,
    titulo,
    precio,
    area
  );
  console.log(nuevoExamen);
  EstanteriaExamenes.push(nuevoExamen);
}

function mostrarCatalogo(array) {
  console.log("Nuestro catálogo de Guias es: ");
  for (let libro of array) {
    console.log(libro.id, libro.titulo, libro.area, libro.precio);
  }
}

function eliminarGuia(array) {
  mostrarCatalogo(array);
  let idEliminar = parseInt(
    prompt(
      "Observar el catalogo de Guias en consola y seleccionar ID a eliminar"
    )
  );
  let coincidencia = false;
  for (let elem of array) {
    if (elem.id == idEliminar) {
      //indexOf me devuelve el indice del valor que paso con parámetro // si devuelve -1 no encontro
      let indice = array.indexOf(elem);
      //qué método me permite borrar de un array ubicando posición
      array.splice(indice, 1);
      coincidencia = true;
      console.log(`El id ${idEliminar} se elimino con exito`);
      mostrarCatalogo(array);
    }
  }
  if (!coincidencia) {
    console.log(
      `El id ${idEliminar} no coincide con ninguna Guia de nuestro catálogo. No se pudo eliminar`
    );
  }
}

function eliminarExamen(array) {
  mostrarCatalogo(array);
  let idEliminar = parseInt(
    prompt(
      "Observar el catalogo de Examenes en consola y seleccionar ID a eliminar"
    )
  );
  let coincidencia = false;
  for (let elem of array) {
    if (elem.id == idEliminar) {
      //indexOf me devuelve el indice del valor que paso con parámetro // si devuelve -1 no encontro
      let indice = array.indexOf(elem);
      //qué método me permite borrar de un array ubicando posición
      array.splice(indice, 1);
      coincidencia = true;
      console.log(`El id ${idEliminar} se elimino con exito`);
      mostrarCatalogo(array);
    }
  }
  if (!coincidencia) {
    console.log(
      `El id ${idEliminar} no coincide con ningun Examen de nuestro catálogo. No se pudo eliminar`
    );
  }
}

function buscarElemento(array) {
  //filter devuelve todo lo que coincida con la búsqueda en un array
  //sino hay ninguna coincidencia array vacio
  let elementoBuscado = prompt(
    "Ingrese el nombre de la guia que desea buscar"
  );
  let busqueda = array.filter(
    (Guias) => Guias.titulo.toLowerCase() === elementoBuscado.toLowerCase()
  );
  if (busqueda.length == 0) {
    console.log(`No hay coincidencias con ${elementoBuscado}`);
  } else {
    mostrarCatalogo(busqueda);
  }
}
function buscarExamen(array) {
  //filter devuelve todo lo que coincida con la búsqueda en un array
  //sino hay ninguna coincidencia array vacio
  let elementoBuscado = prompt(
    "Ingrese el nombre de la guia que desea buscar"
  );
  let busqueda = array.filter(
    (ExamenesSimulacion) => ExamenesSimulacion.titulo.toLowerCase() === elementoBuscado.toLowerCase()
  );
  if (busqueda.length == 0) {
    console.log(`No hay coincidencias con ${elementoBuscado}`);
  } else {
    mostrarCatalogo(busqueda);
  }
}
// Programa principal

do {
  op = menu();
  if (!Number.isInteger(op) || op > 10 || op < 0) {
    op = menu();
  } else {
    switch (op) {
      case 1:
        op = DisponibilidadGuiasExamenes();
        break;
      case 2:
        op = VenderGuia(EstanteriaGuias);
        break;
      case 3:
        op = VenderExamen(EstanteriaExamenes);
        break;
      case 4:
        op = VenderAmbos();
        break;
      case 5:
        AgregarNuevaGuia(EstanteriaGuias);
        break;
      case 6:
        AgregarNuevoExamen(EstanteriaExamenes);
        break;
      case 7:
        eliminarGuia(EstanteriaGuias);
        break;
      case 8:
        eliminarExamen(EstanteriaExamenes);
        break;
      case 9:
        buscarElemento(EstanteriaGuias);
        break;
      case 10:
        buscarExamen(EstanteriaExamenes);
        break;
      case 0:
        op = 0;
        break;
    }
  }
} while (op !== 0);
if (op == 0) {
  console.log("Gracias por visitarnos");
}
