let addToCart= document.querySelector("#addToCart");
let a= document.querySelector(".selected_product_image");

addToCart.addEventListener("click", function(e){
    let objectProduct= {
        idProduct: window.location.pathname.slice(16), // almaceno el id del producto desde la URL
        nameProduct: document.querySelector(".titulo").innerHTML, // almaceno el nombre del producto
        pathImageProduct: document.querySelector(".selected_product_image").attributes[1].value, // almaceno la ruta de la imagen dentro del proyecto
        priceProduct: document.querySelector(".selected_product_price").innerHTML.substr(1) // almaceno el precio del producto
    }
    sessionStorage.setItem("productInformation",JSON.stringify(objectProduct))
})