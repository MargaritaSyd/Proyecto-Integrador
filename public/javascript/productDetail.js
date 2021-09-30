let addToCart= document.querySelector("#addToCart");
let a= document.querySelector(".selected_product_image");

let idProduct= window.location.pathname.slice(16);  // almaceno el id del producto desde la URL
let userInSession= addToCart.dataset.products_user_in_session // almaceno los productos en sesion del usuario logueado. Si no hay productos el valor sera null

let session= JSON.parse(sessionStorage.getItem(userInSession));

addToCart.addEventListener("click", function(e){
    e.preventDefault()
    let duplicate= false;
    if (session!=null){
        for (product of session){
            if(product.idProduct==idProduct){
                duplicate=true;
            }
        }
    }
    if(duplicate){
        alert("Este producto ya se encuentra en tu carrito.");
        //window.location = "/product";
    }
    else {
        window.location = this.href;
        let objectProduct= {
            idProduct: idProduct,
            //idProduct: window.location.pathname.slice(16), // almaceno el id del producto desde la URL
            nameProduct: document.querySelector(".titulo").innerHTML, // almaceno el nombre del producto
            pathImageProduct: document.querySelector(".selected_product_image").attributes[1].value, // almaceno la ruta de la imagen dentro del proyecto
            priceProduct: document.querySelector(".selected_product_price").innerHTML.substr(1), // almaceno el precio del producto
            quantityProduct:1
        }
        sessionStorage.setItem("productInformation",JSON.stringify(objectProduct))
    }
})