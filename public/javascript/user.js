window.addEventListener("load", function(){
    
    let mensajeError = document.querySelector('.mensajeError')
    mensajeError.style.display = 'none'

    let form = document.querySelector('.form');
    form.addEventListener('submit' , function(e){
        
        let error = [];

        let name = document.querySelector('.inputName');
        let mail = document.querySelector('.inputMail');
        let password = document.querySelector('.inputPassword');
        let password2 = document.querySelector('.inputPassword2');
       

        if(name.value==""){
            error.push("Debe ingresar un nombre de usuario");
        }

        if(!mail.value.includes('@')){
            error.push("Debe ingresar un mail valido")
        }
        if(password.value.length<8){
            error.push("La contraseña debe tener más de 8 caracteres")
        }

        if(password.value!=password2.value){
            error.push("Las contraseñas deben coincidir")
        }

        if(error.length>0){
             mensajeError.style.display = 'block';
             mensajeError.style.color = "blue";
             e.preventDefault()
             for(let i=0; i<error.length; i++){
                mensajeError.innerHTML += "<li>" + error[i] + "</li>"
             }
            }
            
        
    //         error.forEach(error=>{
    //             mensajeError.innerHTML += `<li> ${error}</li>`
    //                      })
    //     }

    

})
})