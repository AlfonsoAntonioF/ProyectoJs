//PROYECTO MIS LIBROS
//class constructora
class Libro{
    constructor(id, autor, titulo, precio){
        //atributos-propiedades
       this.id = id,
       this.autor = autor,
       this.titulo = titulo,
       this.precio = precio
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
 const libro1 = new Libro(1,"Jorge Luis Borges", "Aleph", 800)
 
 const libro2 = new Libro(2,"Gabriel García Marquez", "Cien años de Soledad", 4500)
 
 const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800)
 
 const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400)
 
 const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200)
 
 const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2800)

//arrays de objetos:
const estanteria = []
estanteria.push(libro1,libro2,libro3,libro4,libro5,libro6)
const productosCarrito = []

function agregarLibro(){
    let autor = prompt("Ingrese el nombre del autor")
    let titulo = prompt("Ingrese el titulo del libro")
    let precio = parseInt(prompt(`Ingrese el precio de ${titulo}`))
    //instanciarlo en un objeto:
    const nuevoLibro = new Libro(estanteria.length+1,autor, titulo, precio)
    console.log(nuevoLibro)
    estanteria.push(nuevoLibro)          
}

function borrarLibro(array){
    mostrarCatalogo(array)
    let idEliminar = parseInt(prompt("Observar el catalogo en consola y seleccionar ID a eliminar"))
    let coincidencia = false
    for(let elem of array){
        if(elem.id == idEliminar){
            //indexOf me devuelve el indice del valor que paso con parámetro // si devuelve -1 no encontro
            let indice = array.indexOf(elem)
            //qué método me permite borrar de un array ubicando posición
            array.splice(indice, 1)
            mostrarCatalogo(array)
        }
    }
    if(!coincidencia){
            console.log(`El id ${idEliminar} no coincide con ningún libro de nuestro catálogo. No se pudo eliminar`)  
    }
}

function mostrarCatalogo(array){
    //for of: para recorrer un array posición a posición
    console.log("Nuestro catálogo es: ")
    for(let libro of array){
        libro.exponerEnCatalogo()
        
    }
}

//find && filter

function buscarTitulo(array){
    //find: devuelve el elemento completo si hay coincidencia y deja de buscar en el array
    //de no haber coincidencia devuelve undefined
    let tituloBuscado = prompt("Ingrese el titulo que desea buscar")
    let busqueda = array.find(
        //return explicito
        (elem )=>{return elem.titulo.toLowerCase() == tituloBuscado.toLowerCase()}
    )
    
    //no encuentra nada = undefined
    if(busqueda == undefined){
        console.log(`El libro ${tituloBuscado} no se ha encontrado`)
    }else{
        console.log(busqueda)    
    }    
}
function buscarAutor(array){
    //filter devuelve todo lo que coincida con la búsqueda en un array
    //sino hay ninguna coincidencia array vacio
    let autorBuscado = prompt("Ingrese el nombre del autor/a que desea buscar")
    let busqueda = array.filter(
        //sin llaves tiene return implicito
        (libro) => libro.autor.toLowerCase() == autorBuscado.toLowerCase()
    )
    if(busqueda.length == 0){
        console.log(`No hay coincidencias con ${autorBuscado}`)
    }
    else{
        mostrarCatalogo(busqueda)

    }
}

function buscarPorPrecio(array){
    let precioBuscado = parseInt(prompt("Ingrese el precio máximo que puede gastar en un libro"))
    let menores = array.filter(
        (book) => {return book.precio <= precioBuscado}
    )
    if(menores.length == 0){
        console.log(`No hay coincidencias para libros que valgan menos o igual a ${precioBuscado}`)
    }else{
        console.log(`Los libros que valen ${precioBuscado} o menos son:`)
        mostrarCatalogo(menores)
    }
}
//ORDENAMIENTO:
//sort https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function ordenarMayorMenor(array){
    //sort es un método destructivo: altera el array original
    //copiar array: 
    let arrayMayorMenor = array.concat()
    //ordenar de mayor a menor
    // (a,b) => b.anioPeli - a.anioPeli
     arrayMayorMenor.sort(
        (par1,par2) => par2.precio - par1.precio
    )
    mostrarCatalogo(arrayMayorMenor)
}
function ordenarMenorMayor(ar){
    let arrMenor = ar.concat()
    arrMenor.sort(
        //menor a mayor
        (a, b) => a.precio - b.precio
    )
    mostrarCatalogo(arrMenor)
}
function ordenarAlfabeticamenteTitulo(array){
    let ordenadoAlf = array.concat()
    //valor a ordenar no es númerico, es string usar esta estructura:
    //2 Salsa saber word Word Zarate anana
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
    mostrarCatalogo(ordenadoAlf)
}

function agregarAlCarrito(stock, carrito){
    mostrarCatalogo(stock)
    let idCompra = parseInt(prompt(`Ingrese el id del libro que sea comprar`))
    let libroComprado = stock.find(
        (libro) => libro.id == idCompra 
    )
    carrito.push(libroComprado)
    console.log(carrito)
}

function finalizarCompra(carrito){
    //sacar el total del carrito:
    let total = 0
    for(let libro of carrito){
        // total = total + libro.precio
        total += libro.precio
    }
    // console.log(`Total calculado con for of ${total}`)
    //método avanzado reduce
    const totalReduce = carrito.reduce(
        //dos parámetros: funcion y inicio de valor del acumulador
        (acc, elemento)=>
        {return acc + elemento.precio},
        0
    )
    console.log(`El total se su compra es ${totalReduce}. Muchas gracias!`)
    let momentoCompra = new Date()
    console.log(`Su carrito ahora está vacio su compra fue realizada ${momentoCompra.toDateString()}.`)
    
    carrito = []
}
function libroMaximo(array){
    //generar un array con los precios
    //map
    let arrayPrecios = array.map(
        (libro) => libro.precio
    )
    console.log(arrayPrecios) 
    //Math sacamos el maximo
    let maximo = Math.max(...arrayPrecios)
    console.log(maximo)
    //buscamos con el máximo el libro en el array
    let libroMayorPrecio = array.find(
        (libro)=> libro.precio == maximo
    )
    console.log(libroMayorPrecio)
}
function menu(){
    //MENU do while y switch encerrado en una function
    let salirMenu = false
    do{
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
       1 - Agregar libro
       2 - Borrar libro
       3 - Consultar catálogo
       4 - Buscar por titulo
       5 - Buscar por autor
       6 - Buscar por precio
       7 - Ordenar menor a mayor por precio
       8 - Ordenar mayor a menor por precio
       9 - Ordenar alfabeticamente por título
       10 - Agregar al carrito
       11 - Finalizar compra
       12 - Averiguar libro con más valor
       0 - Salir del menu`))
       switch(opcionIngresada){
          case 1:
             agregarLibro()
          break
          case 2:
             borrarLibro(estanteria)
          break
          case 3:
            //invoco function le paso estanteria:
             mostrarCatalogo(estanteria)
            //  mostrarCatForEach(estanteria)
          break
          case 4:
            buscarTitulo(estanteria)
           break
           case 5:
            buscarAutor(estanteria)
           break
           case 6:
            buscarPorPrecio(estanteria)
           break
           case 7:
            ordenarMenorMayor(estanteria)
           break 
           case 8:
            ordenarMayorMenor(estanteria)
           break 
           case 9:
            ordenarAlfabeticamenteTitulo(estanteria)
           break 
           case 10:
            agregarAlCarrito(estanteria, productosCarrito)
           break
           case 11:
            finalizarCompra(productosCarrito)
            break    
            case 12:
                libroMaximo(estanteria)
            break         
          case 0:
             console.log(`Gracias por utilizar nuestra app. Saludos!`)
             salirMenu = true
          break   
          default:
             console.log("Opción no válida, ingrese alguna presente en el menu")
          break
       }
    }while(!salirMenu)
}
menu()