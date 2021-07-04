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
    processForm: function(req,res){
        let newProduct= {
            id: productListOl.length+1,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            payWay: req.body.PayWay,
            cuotas: req.body.cuotas,
            interest: req.body.interest,
            description: req.body.description
        };
        
        if(req.file){
            newProduct.productImage=req.file.filename;
        }
        console.log(req.file)
        productListOl.push(newProduct);
        let productListOlupdated= JSON.stringify(productListOl, null, " ");
        fs.writeFileSync(productListPath, productListOlupdated)
        res.redirect('/')
        
        
    }
}

module.exports = productController;