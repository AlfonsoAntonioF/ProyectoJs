
//CAPTURA DOM
let containerLibros = document.getElementById("libros")
let formCargarLibro = document.getElementById("formCargarLibro")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let selectOrden = document.getElementById("selectOrden")
let buscador = document.getElementById("buscador")
let coincidenciasDiv = document.getElementById("coincidencias")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
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
            agregarAlCarrito(libro)
        })
    }
}

function agregarAlCarrito(elemento){
    // console.log("Funciona " + elemento.titulo)
    //preguntar: existe este libro(elemento) en el array??
    let libroAgregado = productosCarrito.find((libro) => libro.id == elemento.id)
    //realizado con operador ternario
    libroAgregado == undefined ?  
            (//pusheo al array carrito:
            productosCarrito.push(elemento),
            //setStorage
            localStorage.setItem("carrito", JSON.stringify(productosCarrito)),
            console.log(productosCarrito)) :
            console.log(`El libro ${elemento.titulo} ya existe en el carrito`)
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach(
        (productoCarrito) => {
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.titulo}</h4>
                        <p class="card-text">${productoCarrito.autor}</p>
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
        (acumulador, libro)=>
        {return acumulador + libro.precio},
        0
    )
    totalReduce > 0 ? precioTotal.innerHTML = `<strong>El total de su compra es: ${totalReduce}</strong>` : precioTotal.innerHTML = `No hay productos en el carrito` 
    //equivalentes:
    // totalReduce == 0 ? precioTotal.innerHTML = `No hay productos en el carrito`  : precioTotal.innerHTML = `<strong>El total de su compra es: ${totalReduce}</strong>`
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
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito)
})

//CÓDIGO
mostrarCatalogoDOM(estanteria)

