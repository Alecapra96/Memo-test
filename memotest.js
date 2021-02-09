let arrayColores =["red","red","blue","blue","yellow","yellow","grey","grey","green","green","orange","orange"]
function desordenar(array){ // esta función me desordena un array
    array = array.sort(function() {return Math.random() - 0.5});
    return array;
} 
let colores = desordenar(arrayColores);

colores.forEach(function(color,index){ //le asigno a cada div un color
    // document.querySelector(`.cuadro-${index}`).classList.add = color;
    document.querySelector(`.cuadro-${index}`).classList.add(color);
    document.querySelector(`.cuadro-${index}`).innerHTML=color;
    document.querySelector(`.cuadro-${index}`).style.backgroundColor = color;
});

let probando = document.getElementsByClassName("blue")
console.log(probando.item(0)) // null
console.log(probando[1])      //undefined
console.log(probando[2])      //undefined







