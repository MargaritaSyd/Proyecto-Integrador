let i=0;
let ingresar= document.querySelector("#ingresar")
ingresar.addEventListener("click", function(e){
    console.log(i);
    while (i==0) {
        e.preventDefault()
        sessionStorage.clear();
        console.log(sessionStorage);
        i++
        alert("i vale :"+i+", nos vemos!")
    } 
    ingresar.click()    
})