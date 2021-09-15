alert("hola")
let i=0;
let ingresar= document.querySelector("#ingresar")
ingresar.addEventListener("click", function(e){
    while (i==0) {
        e.preventDefault()
        sessionStorage.clear();
        i++
    } 
    ingresar.click()    
})