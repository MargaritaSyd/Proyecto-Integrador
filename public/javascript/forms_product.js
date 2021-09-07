//let productForm= document.querySelector(".productForm");
let productForm= document.querySelector(".productForm");

productForm.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){
    let errors= false

    let product_name_input= document.querySelector("#product_name_input");
    let category= document.querySelector("#category");
    let product_price_input= document.querySelector("#product_price_input");
    let product_stock_input= document.querySelector("#product_stock_input");
    let product_image_input= document.querySelector("#product_image_input");
    
    let name_error= document.querySelector("#name_error");
    name_error.innerHTML="";
    let category_error= document.querySelector("#category_error");
    category_error.innerHTML="";
    let price_error= document.querySelector("#price_error");
    price_error.innerHTML="";
    let stock_error= document.querySelector("#stock_error");
    stock_error.innerHTML="";
    let image_error= document.querySelector("#image_error");
    image_error.innerHTML="";

    if (product_name_input.value==""){
        name_error.innerHTML= 'El campo "nombre" no puede estar vacío'; 
        errors= true;     
    }
    if (category.value==""){
        category_error.innerHTML= 'Debes seleccionar una categoría';      
        errors= true;
    }
    if (product_price_input.value==""){
        price_error.innerHTML= 'El campo "precio" no puede estar vacío';  
        errors= true;    
    }
    if (product_stock_input.value==""){
        stock_error.innerHTML= 'El campo "stock" no puede estar vacío';   
        errors= true;   
    }
    if(product_image_input.value!=""){
        if(product_image_input.files[0].type!="image/bmp"&&product_image_input.files[0].type!="image/gif"&&product_image_input.files[0].type!="image/jpeg"&&product_image_input.files[0].type!="image/jpg"&&product_image_input.files[0].type!="image/png"&&product_image_input.files[0].type!="image/webp"){
            image_error.innerHTML= ('El archivo tiene que ser de formato imagen'); 
            errors= true;   
            product_image_input.value= "";
        } else if (product_image_input.files[0].size > /*512000*/ 30720){
            image_error.innerHTML= "El tamaño del archivo supera el máximo permitido. Puedes intentar nuevamente. Recuerda que la imagen de perfil no es obligatoria."; 
            errors= true; 
            product_image_input.value= "";
        }
    }   
    if (errors== false) {
        productForm.submit();
    } 
}