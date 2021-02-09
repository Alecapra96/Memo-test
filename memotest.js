let arrayColores =["red","red","blue","blue","yellow","yellow","grey","grey","green","green","orange","orange"]
function desordenar(array){ // esta función me desordena un array
    array = array.sort(function() {return Math.random() - 0.5});
    return array;
} 
let colores = desordenar(arrayColores);

colores.forEach(function(color,index){ //le asigno a cada div un color
    // document.querySelector(`.cuadro-${index}`).classList.add = color;
    document.querySelector(`#cuadro-${index}`).classList.add(color);
    document.querySelector(`#cuadro-${index}`).style.backgroundColor = "black";
});

const $cuadros = document.querySelectorAll(".cuadro");
$cuadros.forEach(function(cuadro){
    cuadro.addEventListener("click",secuenciaUsuario);
});

let contador = 0;
let comparaciones =[];
let movimiento=0;
let $movimientos = document.getElementById("movimientos");

function secuenciaUsuario(e){
    console.log("se da vuelta los cuadros :");
    comparaciones.push(e.target);
    let color = comparaciones[contador].className;
     color = color.replace("cuadro",'').trim();
     console.log(color)
    comparaciones[contador].style.backgroundColor=color
    console.log(comparaciones) // hago visible los cuadros que estan aca adentro
    contador++
    $cuadros.forEach(function(cuadro){
        cuadro.onclick = function(){
            if(comparaciones.length >= 2){
                if(comparaciones[0] === comparaciones[1]){
                    console.log("hizo click en el mismo cuadrado, lo vuelvo a ocultar")
                    comparaciones[0].style.backgroundColor="black"
                    comparaciones=[];
                    contador=0;
                    movimiento++ //le sumo un nivel por pelotudo
                    $movimientos.innerText = "Movimientos #"+movimiento;
                }else{
                    console.log("entro a donde comparo las clases")
                    if(comparaciones[0].className === comparaciones[1].className){
                        movimiento++
                        $movimientos.innerText = "Movimientos #"+movimiento;
                        console.log("Son del mismo color, los elimino")
                        resaltarCuadro(comparaciones)
                        setTimeout(function(){ 
                            removerCuadro(comparaciones[0]);
                            removerCuadro(comparaciones[1]);
                            comparaciones=[];
                            let $cuadros1 = document.querySelectorAll(".cuadro");
                            setTimeout(function(){ 
                                if($cuadros1.length === 0){
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
                        },550);
                        contador=0;
                    }else{
                        console.log("Le erro, doy vuelta los cuadros")
                        resaltarCuadro(comparaciones)
                        comparaciones=[];
                        contador=0;
                        movimiento++
                        $movimientos.innerText = "Movimientos #"+movimiento;
                    }
                }
            }

        }
    });
    
}
  
function removerCuadro(cuadro){
    padre = cuadro.parentNode;
    return padre.removeChild(cuadro);
}
function resaltarCuadro(cuadro){
    let variable1= cuadro[0];
    let variable2= cuadro[1];
    setTimeout(function(){ 
    variable1.style.backgroundColor="black";
    variable2.style.backgroundColor="black";
    },600);
}