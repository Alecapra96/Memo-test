let movimiento = 0;
let $movimientos = document.getElementById("movimientos");
let $cuadros = document.querySelectorAll(".cuadro");
let $primerCuadro;
let $segundoCuadro;
let color;
let comparacion=[];

prepareGame();
game()

function game() {
console.log(comparacion.length)
    if (comparacion.length === 2) {
        console.log("entre")
        blockinput()
        compare()
    } else {
        userTurn()
    }
    if (comparacion.length === 0) {
        endGame()
    }
}
function prepareGame(){
    const arrayColores =["red","red","blue","blue","yellow","yellow","grey","grey","green","green","orange","orange","pink","pink","purple","purple"]
    const colores = desordenar(arrayColores);
    colores.forEach(function(color,index){ //le asigno a cada div un color
        document.querySelector(`#cuadro-${index}`).classList.add(color);
        document.querySelector(`#cuadro-${index}`).style.backgroundColor = "black";
    });
}    
function userTurn(){
    $cuadros.forEach(function(cuadro){
        cuadro.addEventListener("click",firstMovement);
    });
}
function firstMovement(e){
    comparacion.push(e.target);
    console.log(comparacion);
    $primerCuadro=comparacion[0];
    $segundoCuadro=comparacion[1]
    resaltarCuadro($primerCuadro);
    game();
}
function compare(){
    if($primerCuadro === $segundoCuadro){ 
        movimiento++; //le sumo uno por boludo
        $movimientos.innerText = "Movimientos #"+ movimiento;
        hideSquare($primerCuadro);
        reiniciarValores()
        game()
    }
    else if($primerCuadro.className === $segundoCuadro.className){
        movimiento++;
        resaltarCuadro($segundoCuadro);
        setTimeout(function(){ 
            removerCuadro($primerCuadro);
            removerCuadro($segundoCuadro);
            reiniciarValores()
            game()
        },600);           
    }else{
        movimiento++;
        resaltarCuadro($segundoCuadro);
        setTimeout(function(){ 
            hideSquare($primerCuadro);
            hideSquare($segundoCuadro);
            reiniciarValores()
            game()
        },600);
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
    comparacion = [];
    return comparacion ;
}
function removerCuadro(cuadro){
    padre = cuadro.parentNode;
    return padre.removeChild(cuadro);
}
function blockinput() {
    $cuadros.forEach(cuadro => {
        cuadro.onclick = function (e) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!")
        }
    })
}
function endGame(){
    $cuadros = document.querySelectorAll(".cuadro");
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
function userTurn(){
    $cuadros.forEach(function(cuadro){
        cuadro.onclick = function (e) {
            firstMovement(e)
        }    });
}