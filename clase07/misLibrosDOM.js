class Libro{
    constructor(id, autor, titulo, precio, imagen){
        //atributos-propiedades
       this.id = id,
       this.autor = autor,
       this.titulo = titulo,
       this.precio = precio,
       this.imagen = imagen
    }
    //métodos en class se declaran por fuera del constructor
    mostrarInfoLibro(){
       console.log(`El libro fue escrito por ${this.autor} su titulo es ${this.titulo} y su precio es ${this.precio}`)
    }
    exponerEnCatalogo(){
        console.log(this.id, this.titulo, this.autor, this.precio)
    }
 }
 //Instanciación de objetos: 
 const libro1 = new Libro(1,"Jorge Luis Borges", "Aleph", 800, "AlephBorges.jpg")
 
 const libro2 = new Libro(2,"Gabriel García Marquez", "Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")
 
 const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

 const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")
 
 const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")
 
 const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2800, "CiudadPerrosVargasLlosa.jpg")

//arrays de objetos:
//es preguntar si estanteria existe en el storage:
//si existe, hay info cargada
let productosCarrito = []
let estanteria = []
if(localStorage.getItem("estanteria")){
    
    // estanteria = JSON.parse(localStorage.getItem("estanteria"))
    //hacer for of de estanteria y pasarle new Libro
    for(let book of JSON.parse(localStorage.getItem("estanteria"))){
        let libroStorage = new Libro (book.id, book.autor, book.titulo, book.precio, book.imagen)
        estanteria.push(libroStorage)
    }

}else{
    //no existe seteamos porprimera vez
    console.log("seteamos por primera vez")
    estanteria.push(libro1,libro2,libro3,libro4,libro5,libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
//setear stock con operador OR

// let biblioteca = JSON.parse(localStorage.getItem("biblioteca")) || [libro1]
// console.log(biblioteca)
//CAPTURA DOM
let containerLibros = document.getElementById("libros")
let formCargarLibro = document.getElementById("formCargarLibro")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let selectOrden = document.getElementById("selectOrden")
let buscador = document.getElementById("buscador")
let coincidenciasDiv = document.getElementById("coincidencias")
//FUNCTIONS: 

function mostrarCatalogoDOM(array){
    //resetear el container
    containerLibros.innerHTML = ""
    //for of: para recorrer un array posición a posición
    for(let libro of array){
        
        let libroNuevoDiv= document.createElement("div")
        libroNuevoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
        libroNuevoDiv.innerHTML = `
            <div id="${libro.id}" class="card" style="width: 18rem;">
                    <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor} ">
                    <div class="card-body">
                        <h4 class="card-title"></h4>
                        <p>Autor: ${libro.autor}</p>
                        <p>${libro.titulo}</p>
                        <p class="${libro.precio <= 3000 && "oferta"}">Precio: ${libro.precio}</p>
                    <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                    </div>
        </div> `
        containerLibros.append(libroNuevoDiv)
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        console.log(agregarBtn)
        agregarBtn.addEventListener("click", () => {
            console.log("Funciona " + libro.titulo)
            //dentro del for of libro es mi objeto
            productosCarrito.push(libro)
            console.log(productosCarrito)
        })
    }
}

function agregarLibro(array){
    let autor = document.getElementById("autorInput")
    let titulo = document.getElementById("tituloInput")
    let precio = document.getElementById("precioInput")
    //instanciarlo en un objeto:
    const nuevoLibro = new Libro(array.length+1,autor.value, titulo.value, parseInt(precio.value), "libroNuevo.jpg")
    array.push(nuevoLibro)  
    autor.value =""
    titulo.value =""
    precio.value =""    
    // formCargarLibro.reset()  
    //SETEAR STORAGE 
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
function ordenarMayorMenor(array){
    //copiar array: 
    let arrayMayorMenor = array.concat()
    
     arrayMayorMenor.sort(
        (par1,par2) => par2.precio - par1.precio
    )
    mostrarCatalogoDOM(arrayMayorMenor)
}
function ordenarMenorMayor(ar){
    let arrMenor = ar.concat()
    arrMenor.sort(
        //menor a mayor
        (a, b) => a.precio - b.precio
    )
    mostrarCatalogoDOM(arrMenor)
}
function ordenarAlfabeticamenteTitulo(array){
    let ordenadoAlf = array.concat()
    ordenadoAlf.sort(
        (a,b) => {
            if(a.titulo > b.titulo){
                return 1
            }
            if(a.titulo < b.titulo){
                return -1
            }
            //no es ni mayor ni menor
            return 0
        }
    )
    mostrarCatalogoDOM(ordenadoAlf)
}
function buscarInfo(buscado,array){
    //me devuelve un array vacio si no encuentra, sino un array elementos con la coincidencias
    let coincidencias = array.filter(
        (libro) => {
            //includes cualquier coincidencia parcial en el string con includes
            return libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
        }
    )
    //ternario para evaluar si coincidencias está vacio
    //ternario, tenemos varias instrucciones encerrar entre parentesis y separar por coma ,
    coincidencias.length > 0 ? (mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML ="") : (mostrarCatalogoDOM(array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su búsqueda, este es nuestro catálogo completo</h3>`) 
}

//EVENTOS PROYECTO:
buscador.addEventListener("input", () => {
    console.log(buscador.value)
    buscarInfo(buscador.value,estanteria)
})
guardarLibroBtn.addEventListener("click", () =>{
    
    agregarLibro(estanteria)
    mostrarCatalogoDOM(estanteria)
} )

selectOrden.addEventListener("change", () => {
    // console.log("Detecto cambio")
    console.log(selectOrden.value)
    switch(selectOrden.value){
        case "1":
            ordenarMayorMenor(estanteria)
        break
        case "2":
            ordenarMenorMayor(estanteria)
        break
        case "3":
            ordenarAlfabeticamenteTitulo(estanteria)
        break
        default:
            mostrarCatalogoDOM(estanteria)
        break
    }
})


//CÓDIGO
mostrarCatalogoDOM(estanteria)

