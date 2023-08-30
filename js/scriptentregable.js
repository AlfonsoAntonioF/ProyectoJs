let GuiasTotales = 200
let ExamenesTotales = 200


function menu() {
    let opcion = parseInt(prompt(`Porfavor ingrese un valor entero entre 0 y 3 para elegir una opcion \n Ingrese la opción deseada
   1 - Ver disponibilidad de guias y examenes
   2 - Comprar una guia
   3 - Comprar un examen de simulacion
   4 - Comprar una Guía y un examen de simulación
   0 - Salir del menu`))
   return opcion 
}
function DisponibilidadGuiasExamenes(){
    let op = parseInt(prompt(` Tenemos ${GuiasTotales} guias de estudio disponibles \n 
    Tenemos ${ExamenesTotales} Examenes disponibles\n 
    Para regresar al menu principal precione 5 `))
    return op
}
function VenderGuia() {
    let op
    if (GuiasTotales > 0 ){
        GuiasTotales--;
        op = parseInt(prompt('Guia Vendida con exito\n Para Regresar al menu principal preciona 5'))
    }else{
        op = parseInt(prompt('Por el momento no contamos con guias en stock\n Para Regresar al menu principal preciona 5'))
    }
    return op

}
function VenderExamen() {
    let op
    if (ExamenesTotales > 0 ){
        ExamenesTotales--;
        op = parseInt(prompt('Examen Vendido con exito\n Para Regresar al menu principal preciona 5'))
    }else{
        op = parseInt(prompt('Por el momento no contamos con Examenes en stock\n Para Regresar al menu principal preciona 5'))
    }
    return op

}
function VenderAmbos() {
    let op
    if (ExamenesTotales > 0 && GuiasTotales > 0 ){
        ExamenesTotales--;
        GuiasTotales--;
        op = parseInt(prompt('Examen y Guia Vendido con exito\n Para Regresar al menu principal preciona 5'))
    }else if(ExamenesTotales > 0){
        op = parseInt(prompt('Por el momento no contamos con Guias en stock, solo Examenes \n Para Regresar al menu principal preciona 5'))
    }else if(GuiasTotales > 0){
        op = parseInt(prompt('Por el momento no contamos con Examenes en stock, solo Guias \n Para Regresar al menu principal preciona 5'))
    }
    return op
}
let op
do {
    op = menu();
   if (!Number.isInteger(op) || op > 4 || op < 0) {
        op = menu();
    }else{
        switch (op) {
            case 1:
                op = DisponibilidadGuiasExamenes();
                break;
                
            case 2:
                op = VenderGuia();
                break;
                
            case 3:
                op = VenderExamen();
                break;
            case 4:
                op = VenderAmbos(); 
                break;
            case 0:
                op = 0;
                break;
             
        }
    }

} while (op !== 0 );
    if (op == 0 ){
        console.log('Gracias por visitarnos')
    }
    