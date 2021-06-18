let productController = {
    create: function(req,res){
        res.render('products/creacionProducto');
    },
    detail: function(req,res){
        res.render('products/detalleProducto');
    },

    edit: function(req,res){
        res.render('products/edicionProducto');
    },

    list: function(req,res){
        res.render('products/listadoDeProductos');
    },
}

module.exports = productController;