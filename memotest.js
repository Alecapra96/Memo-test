let movimiento = 0;
let $movimientos = document.getElementById("movimientos");
const $cuadros = document.querySelectorAll(".cuadro");
let $primerCuadro=null;
let color;
prepareGame();


function firstMovement(e){
    let $cuadroActual=e.target;
    resaltarCuadro($cuadroActual);
    if($primerCuadro === null){
        $primerCuadro = $cuadroActual;
    }else{
        if($cuadroActual === $primerCuadro){ 
            movimiento++; //le sumo uno por boludo
            $movimientos.innerText = "Movimientos #"+ movimiento;
            console.log("MISMO CUADRO PRESIONADO")
            reiniciarValores()
        }    
        else if($cuadroActual.className === $primerCuadro.className){
            console.log("SON DEL MISMO COLOR , NICE")
            reiniciarValores()

        }else{
            console.log("SON DEL DISTINTOS")
            reiniciarValores()
        }
    }   
    
    
}

function prepareGame(){
    const arrayColores =["red","red","blue","blue","yellow","yellow","grey","grey","green","green","orange","orange","pink","pink","purple","purple"]
    const colores = desordenar(arrayColores);
    colores.forEach(function(color,index){ //le asigno a cada div un color
        document.querySelector(`#cuadro-${index}`).classList.add(color);
        document.querySelector(`#cuadro-${index}`).style.backgroundColor = "black";
    });
    $cuadros.forEach(function(cuadro){
        cuadro.addEventListener("click",firstMovement);
    });
}
function desordenar(array){ // esta función me desordena un array
    array = array.sort(function() {return Math.random() - 0.5});
    return array;
    
} 
function resaltarCuadro(cuadro){
    color = cuadro.className;
    color = color.replace("cuadro",'').trim();
    return cuadro.style.backgroundColor=color
}
function reiniciarValores(){
    $primerCuadro=null;
    $cuadroActual=null;
    return $primerCuadro && $cuadroActual;
}