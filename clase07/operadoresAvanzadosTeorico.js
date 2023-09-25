//CLASE N°7 OPERADORES AVANZADOS PARTE 1 -- TEORÍA
//sugar syntax ++ += -=

// //equivalente con sugar syntax ++
// i = i + 1
// i++
// //equivalente en sugar syntax +=
// j = j + i
// j += i
// //equivalente -=
// k = k - i
// k -= i

//operador ternario: forma de simplificar un IF ELSE
let num = 2
if(num < 5){
    console.log(`El numero es menor a 5`)
}else{
    console.log(`El número es igual o mayor a 5`)
}
//reemplazar por ternario
//condición ? instrucciones si es TRUE : instrucciones si es FALSE
num < 5 ? console.log(`El numero es menor a 5. CON TERNARIO`) : console.log(`El número es igual o mayor a 5. CON TERNARIO`)

//operador || OR devuelve el segundo término en caso de ser falsy(0, null, undefined, false, string vacio y NaN)
let total = ""
console.log( total || `Su carrito no tiene productos`)

//operador nullish devuelve el segundo término en caso de ser nullish(null o undefined)
let carrito = false ?? `No existen productos en el carrito`
console.log(carrito)

//Acceso condicional a un objeto: sirve para manejo de errores de acceso
let libroAleph = {
    titulo: "Aleph",
    autor: "Borges",
    precio: 8500,
    editorial: "Sudamericana"
}
let libroIngles = {
    price: 5400,
    author: "Allende",
    title: "Paula"
}
// let precio = libroAleph.precio || `El libro no tiene precio`
// console.log(precio)
// let libro5 = null
// //acceso condicional ?.
// let precioAndamios = libro5?.precio || `El libro x no tiene precio`
// console.log(precioAndamios)

//DESESTRUCTURACIÓN
//común
//forma agil
let {titulo, precio, editorial, edicion} = libroAleph
console.log(titulo)
console.log(precio)
console.log(editorial)
console.log(edicion)

// let {titulo} = libroIngles
// console.log(titulo)

//CON ALIAS
let {price: precioLibro, author: autorLibro} = libroIngles
console.log(precioLibro)
console.log(autorLibro)

//desestructurar un array, por posición:

let numeros = [1,2,3,4,5,7,9]

let [primero, , otroNum, cuarto] = numeros
console.log(primero)
console.log(otroNum)
console.log(cuarto)

//spread de objetos:
let alephSuper = {
    ...libroAleph,
    vendido: true,
    cantidad: 25
}
console.log(alephSuper)