let front_validations_box = document.querySelector("#front_validations_box");
front_validations_box.style.display= "none";

let loginform= document.querySelector(".loginform");

loginform.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){
    let more_validations = document.querySelector("#more_validations");
    if(more_validations!=null){
        more_validations.style.display= "none";
    }

    let user_error_message= document.querySelector("#user_error_message");
    user_error_message.innerHTML="";
    
    let inputName= document.querySelector(".inputName");
    let inputSurame= document.querySelector(".inputSurame");
    let inputMail= document.querySelector(".inputMail");
    let inputPassword= document.querySelector(".inputPassword");
    let inputPassword2= document.querySelector(".inputPassword2");
    let image_user_input= document.querySelector("#image_user_input");

    let userForm_errors_array= [];
    if (inputName.value==""){
        userForm_errors_array.push ("Ingresá tu nombre");      
    }
    if (inputSurame.value==""){
        userForm_errors_array.push ("Ingresá tu apellido");      
    }
    if (!inputMail.value.includes("@")){
        userForm_errors_array.push ("Ingresá tu mail");      
    }
    if (inputPassword.value.length<8){
        userForm_errors_array.push ("La contraseña debe tener al menos 8 caracteres");      
    } else if (inputPassword2.value != inputPassword.value) {
        userForm_errors_array.push ("Las contraseñas no coinciden, intenta nuevamente"); 
    }

    if(image_user_input.value!=""){
        if(image_user_input.files[0].type!="image/bmp"&&image_user_input.files[0].type!="image/gif"&&image_user_input.files[0].type!="image/jpeg"&&image_user_input.files[0].type!="image/jpg"&&image_user_input.files[0].type!="image/png"&&image_user_input.files[0].type!="image/webp"){
            userForm_errors_array.push ('El archivo tiene que ser de formato imagen'); 
        } else if (image_user_input.files[0].size > 30720){
            userForm_errors_array.push ("El tamaño del archivo supera el máximo permitido. Puedes intentar nuevamente. Recuerda que la imagen de perfil no es obligatoria."); 
        }
    }

    if(userForm_errors_array.length>0){   
        front_validations_box.style.display= "flex"; 

        user_error_message.style.margin="auto";
        for(let i=0; i<userForm_errors_array.length; i++){
            user_error_message.innerHTML+="<p class='mensajeError' style='color:blue;'>"+userForm_errors_array[i]+"</p>";
        } 
        inputPassword.value="";
        inputPassword2.value="";
        image_user_input.value=""
    }    
    else {
        loginform.submit();
    }
}