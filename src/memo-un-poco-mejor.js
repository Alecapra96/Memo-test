let movimiento = 0;
let $movimientos = document.getElementById("movimientos");
let $cuadros = document.querySelectorAll(".cuadro");
let $primerCuadro=null;
let color;
prepareGame();
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

function firstMovement(e){
    let $cuadroActual=e.target;
    if($primerCuadro === null){
        $primerCuadro = $cuadroActual;
        resaltarCuadro($primerCuadro);
    }else{
        
        if($cuadroActual === $primerCuadro){ 
            movimiento++; //le sumo uno por boludo
            $movimientos.innerText = "Movimientos #"+ movimiento;
            console.log("MISMO CUADRO PRESIONADO")
            hideSquare($cuadroActual);
            reiniciarValores()
        }    
            else if($cuadroActual.className === $primerCuadro.className){
                movimiento++;
                resaltarCuadro($cuadroActual);
                console.log("SON DEL MISMO COLOR , NICE")
                setTimeout(function(){ 
                    removerCuadro($cuadroActual);
                    removerCuadro($primerCuadro);
                    $cuadros = document.querySelectorAll(".cuadro");
                    endGame();
                    reiniciarValores()
                },600);           
            }else{
                movimiento++;
                resaltarCuadro($cuadroActual);
                console.log("SON DEL DISTINTOS COLORES");
                setTimeout(function(){ 
                    hideSquare($cuadroActual);
                    hideSquare($primerCuadro);
                    reiniciarValores()
                },600);
            }
    }    
}


function desordenar(array){ // esta función me desordena un array
    array = array.sort(function() {return Math.random() - 0.5});
    return array;
    
} 
function resaltarCuadro(cuadro){
    color = cuadro.className;
    color = color.replace("cuadro",'').trim();
    return cuadro.style.backgroundColor=color;
}
function hideSquare(cuadro){
    return cuadro.style.backgroundColor="black"
}
function reiniciarValores(){
    $primerCuadro=null;
    return $primerCuadro 
}
function removerCuadro(cuadro){
    padre = cuadro.parentNode;
    return padre.removeChild(cuadro);
}
function deactivatUserTurn() {
    $cuadros.forEach(cuadro => {
        cuadro.onclick = function (e) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!")
        }
    })
}
function endGame(){
    return setTimeout(function(){ 
        if($cuadros.length === 0){
            Swal.fire({
                icon: 'success',
                title: "GANASTE , TE TOMO "+movimiento+" MOVIMIENTOS"
                }).then((result) => {
                    if (result.isConfirmed) {
                        return location.reload();
                    }else{
                        location.reload();   
                    } 
                })
        }
    },90);
}