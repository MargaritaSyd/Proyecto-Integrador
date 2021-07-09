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
        let idProd = req.params.id
        let productD = ''

        for(let i=0; i<productListOl.length; i++){
            if(productListOl[i].id == idProd){
                productD = productListOl[i]
            }
        }

            let relatedProduct = productListOl.filter((e)=>{
                return e.category == productD.category
        })
    
    res.render('products/productDetail', {productD , relatedProduct});
        
    },

    edit: function(req,res){
        let idProduct= req.params.id;
        let product= productListOl.find(element=>element.id==idProduct);
        //console.log(product);
        //let product= productListOl[idProduct-1]
        res.render('products/editProduct',{product});
    },

    list: function(req,res){
        res.render('products/productList', {productListOl});
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
        
        
    },
    update:(req,res)=>{
        idProduct= req.params.id;
        let productToMidyfy= productListOl.find(element=>element.id==idProduct);
        let modifiedProduct={
            id: idProduct,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            payWay: req.body.payWay,
            cuotas: req.body.cuotas,
            interest: req.body.interest,
            description: req.body.description
        }
        if(req.file){
            modifiedProduct.productImage=req.file.filename;
        } else if (req.body.deleteImage=='on'){
            modifiedProduct.productImage='';
        } else{
            modifiedProduct.productImage=productToMidyfy.productImage;
        }
        modifiedProduct.inStock= true;
        //splice sirve si no se borra nunca ningun producto del json
        //productListOl.splice((idProduct-1),1,modifiedProduct);
        //splice sirve si no se borra nunca ningun producto del json
        for(let i=0; i<productListOl.length;i++){
            if(productListOl[i].id==modifiedProduct.id){
                productListOl[i]=modifiedProduct;
                break;
            }
        }
        console.log(req.body.deleteImage);
        let productListOlupdated= JSON.stringify(productListOl, null, " ");
        fs.writeFileSync(productListPath, productListOlupdated)
        res.redirect('/product');
    }
}

module.exports = productController;


/*
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
        res.render('products/productList', {productListOl});
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
*/