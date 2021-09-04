// window.addEventListener("load" , function(){
//     let addToCart = document.querySelector('.addToCart');
//     addToCart.addEventListener("click" , function(e){
//         let button = e.target;
//         let itemName = button.closest(".addProductName")
//         alert("ok")
//     })

   
//         // localStorage.setItem("addProduct" , JSON.stringify(productD))
        
//         // let addToCartProduct = localStorage.getItem('addProduct')
//        // let addProductName = document.querySelector(".addProductName")

//       //  addProductName.innerHTML += "nombre"
//   //  })
    
// })

class Carrito{
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('addToCart')){
            const addProduct = e.target.parentElement.parent.Element;
            this.infoProduct(addProduct);
        }
    }
}