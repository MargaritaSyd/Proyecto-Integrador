let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8');
let db = require("../dataBase/models");
let Op = db.Sequelize.Op;
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};

let indexController = {
    index: function(req,res){
        db.product.findAll({
            where: {
                
                showing: { [Op.gt]: 0 }
            }
        })
        .then(function(productsStockOn){
            
            return res.render("index", {productsStockOn});

        })
        
    },
    cart: function(req,res){
        res.render('cart');
    },
    faqs: function(req,res){
        res.render('faqs');
    },
    nosotros: function(req,res){
        res.render('nosotros');
    },
}

module.exports = indexController;