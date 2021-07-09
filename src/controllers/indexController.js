let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8');
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};

let indexController = {
    index: function(req,res){
        let productsStockOn=productListOl.filter((element)=>{return element.inStock==true})
        res.render('index', {productsStockOn});
    },
    cart: function(req,res){
        res.render('cart');
    },
}

module.exports = indexController;