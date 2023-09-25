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
//setear productosCarrito con operador Nullish
let productosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? []
console.log(productosCarrito)
