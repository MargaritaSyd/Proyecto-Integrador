let idUser=  window.location.pathname.slice(6); // almaceno el id del usuario desde la URL
let userFounded= "user"+idUser;

if (sessionStorage.getItem("productInformation")!=null){

    let productSelected= JSON.parse(sessionStorage.getItem("productInformation"));
    sessionStorage.removeItem("productInformation")

    let arrayProducts=[];

    if (sessionStorage.getItem(userFounded)==null){
        arrayProducts.push(productSelected)
        sessionStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
    }
    else {
        arrayProducts=JSON.parse(sessionStorage.getItem(userFounded))
        sessionStorage.removeItem(userFounded)
        arrayProducts.push(productSelected)
        sessionStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
    }
}

//-----------------------------------------------

let sessionStorageProducts= JSON.parse(sessionStorage.getItem(userFounded));
let productos_seleccionados= document.querySelector("#productos-seleccionados"); 

const fragment= document.createDocumentFragment();

if(sessionStorageProducts!=null){
    let texto_importe_total= document.getElementById("texto-importe-total");
    let importe_total= document.getElementById("importe-total");
    let total_account=0; 
    for (const product of sessionStorageProducts){
        // estructura HTML
        // div padre de toda la estructura de cada producto
        const div_productoSeleccionado= document.createElement("div");
        div_productoSeleccionado.classList.add("producto-seleccionado");

            // hijos del div padre anterior
            const label_nombreProductoSeleccionado= document.createElement("label");
            label_nombreProductoSeleccionado.classList.add("nombre-producto-seleccionado");
                label_nombreProductoSeleccionado.innerHTML= `<strong>Seleccionaste</strong> ${product.nameProduct}`

            const span_contenedorImagenProductoSeleccionado= document.createElement("span");
            span_contenedorImagenProductoSeleccionado.classList.add("contenedor-imagen-producto-seleccionado");
                const img_productoSeleccionado= document.createElement("img");
                img_productoSeleccionado.classList.add("imagen-producto-seleccionado");
                img_productoSeleccionado.setAttribute("src",product.pathImageProduct);
                span_contenedorImagenProductoSeleccionado.appendChild(img_productoSeleccionado)

            const div_detalleCompraPadre= document.createElement("div");
            div_detalleCompraPadre.classList.add("detalle-compra-padre");
                const div_detalleCompraHijo= document.createElement("div");
                div_detalleCompraHijo.classList.add("detalle-compra-hijo");
                    const label_unitaryPrice= document.createElement("label");
                    label_unitaryPrice.textContent= "Precio unitario"
                    const label_precioProductoSeleccionado= document.createElement("label");
                    label_precioProductoSeleccionado.classList.add("precio-producto-seleccionado");
                    label_precioProductoSeleccionado.textContent= `$${product.priceProduct}`;
                    div_detalleCompraHijo.appendChild(label_unitaryPrice);
                    div_detalleCompraHijo.appendChild(label_precioProductoSeleccionado);
                div_detalleCompraPadre.appendChild(div_detalleCompraHijo) 
                
            const div_detalleCompraPadre2= document.createElement("div");
            div_detalleCompraPadre2.classList.add("detalle-compra-padre");
                const div_detalleCompraHijo2= document.createElement("div");
                div_detalleCompraHijo2.classList.add("detalle-compra-hijo");    
                    const label_totalProducts= document.createElement("label");
                    label_totalProducts.textContent= "Cantidad"
                    const input_cantidadProductoSeleccionado= document.createElement("input");
                    input_cantidadProductoSeleccionado.classList.add("cantidad-producto-seleccionado");
                    input_cantidadProductoSeleccionado.setAttribute("type", "number");
                    input_cantidadProductoSeleccionado.setAttribute("value", product.quantityProduct);
                    input_cantidadProductoSeleccionado.setAttribute("min", 1);
                    const label_importeTotalProductoSeleccionado= document.createElement("label");
                    label_importeTotalProductoSeleccionado.classList.add("importe-total-producto-seleccionado")
                    label_importeTotalProductoSeleccionado.textContent= `$${product.priceProduct*input_cantidadProductoSeleccionado.value}`;
                    div_detalleCompraHijo2.appendChild(label_totalProducts);
                    div_detalleCompraHijo2.appendChild(input_cantidadProductoSeleccionado);
                    div_detalleCompraHijo2.appendChild(label_importeTotalProductoSeleccionado);
                div_detalleCompraPadre2.appendChild(div_detalleCompraHijo2) 

            const div_detalleCompraPadre3= document.createElement("div");
            div_detalleCompraPadre3.classList.add("detalle-compra-padre");
                const div_detalleCompraHijo3= document.createElement("div");
                div_detalleCompraHijo3.classList.add("detalle-compra-hijo-2");    
                    const icon= document.createElement("i");
                    icon.classList.add("fas", "fa-trash-alt", "descartar-compra");
                    div_detalleCompraHijo3.appendChild(icon);
                div_detalleCompraPadre3.appendChild(div_detalleCompraHijo3)                
        // estructura HTML    

        total_account+= parseInt(label_importeTotalProductoSeleccionado.textContent.substr(1));

        div_productoSeleccionado.appendChild(label_nombreProductoSeleccionado)
        div_productoSeleccionado.appendChild(span_contenedorImagenProductoSeleccionado)
        div_productoSeleccionado.appendChild(div_detalleCompraPadre)
        div_productoSeleccionado.appendChild(div_detalleCompraPadre2)
        div_productoSeleccionado.appendChild(div_detalleCompraPadre3)

        fragment.appendChild(div_productoSeleccionado);

        input_cantidadProductoSeleccionado.addEventListener("click", function(){
            productArray_generator()
            total_account= 0;
            label_importeTotalProductoSeleccionado.textContent= `$${product.priceProduct*input_cantidadProductoSeleccionado.value}`;
            let price_products = document.querySelectorAll(".importe-total-producto-seleccionado")
            for( let i=0; i<price_products.length; i++){
                total_account+=parseInt(price_products[i].textContent.substr(1));
                importe_total.textContent= `$${total_account}`;
            }
        })  
    }  
    texto_importe_total.style.display= "inline";
    importe_total.textContent= `$${total_account}`;    
}
else {
    productos_seleccionados.innerHTML="<h1>Aún no has agregado ningún producto a tu carrito</h1>"
}

productos_seleccionados.appendChild(fragment)

function productArray_generator(){
    let arrayProducts=[];
    arrayProducts=JSON.parse(sessionStorage.getItem(userFounded));
    let products= document.querySelectorAll(".producto-seleccionado");
    let newArrayProducts=[];
    for (let i=0; i<products.length; i++){
        let objectProduct= {
            idProduct: arrayProducts[i].idProduct,
            nameProduct: products[i].childNodes[0].textContent.slice(14),
            pathImageProduct: products[i].childNodes[1].childNodes[0].attributes[1].value,
            priceProduct: products[i].childNodes[2].childNodes[0].childNodes[1].outerText.substr(1),
            quantityProduct: products[i].childNodes[3].childNodes[0].childNodes[1].value
        }    
        newArrayProducts.push(objectProduct);
    }
    sessionStorage.setItem(userFounded,JSON.stringify(newArrayProducts))
    return true;
}

/* // bottom buttons (Cancelar/ Ver más / Confirmar)
let more_products_button= document.getElementById('more-products-button');
more_products_button.addEventListener("click", function(){
    productArray_generator()
})

let confirm_button= document.getElementById('confirm-button');
confirm_button.addEventListener("click", function(){
    productArray_generator()
})
// bottom buttons (Cancelar/ Ver más / Confirmar) */

// funcion para generar el array de productos en sessionStorage, que se renderizara en la vista cart.ejs

/* let localStorageProducts= JSON.parse(localStorage.getItem(userFounded));

let productos_seleccionados= document.querySelector("#productos-seleccionados"); 
let cont=0;
if(localStorageProducts!=null){
    for (let i=0;i<localStorageProducts.length;i++){
        cont ++
        if(cont==1){
            productos_seleccionados.innerHTML+=
            "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div>" 
        }
        else if (cont==2){
            productos_seleccionados.innerHTML+=
            "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div><div class='main-separador2'></div>" 
        }
        else {
            productos_seleccionados.innerHTML+=
            "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div><div class='main-separador2'></div><div class='main-separador3'></div>" 
            cont=0;
        }
    }
}
else {
    productos_seleccionados.innerHTML="<h1>Aún no has agregado ningún producto a tu carrito</h1>"
} */