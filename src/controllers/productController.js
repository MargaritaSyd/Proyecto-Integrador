let productController = {
    create: function(req,res){
        res.render('products/createProduct');
    },
    detail: function(req,res){
        res.render('products/productDetail');
    },

    edit: function(req,res){
        res.render('products/editProduct');
    },

    list: function(req,res){
        res.render('products/productList');
    },
}

module.exports = productController;