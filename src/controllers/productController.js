const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8'); 

let {validationResult} = require ('express-validator');

let db = require("../dataBase/models");
let Op = db.Sequelize.Op;
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};

let productController = {
    create: function(req,res){
        db.category.findAll()
            .then(function(category){
                res.render('products/createProduct', {category})
            })
    },
    detail: function(req,res){
        db.product.findAll()
        .then(function(product){
            let validUrl= false;
            if(req.params.id>=1 && req.params.id<=product.length){
                validUrl=true    
            }
            if(validUrl==true){
                let productD = product.find(products=>
                    products.id==req.params.id,
                    );
                if(productD.showing==1){
                    let related_product_list = product.filter(products => {
                        if(products.id!=productD.id && products.showing==1){
                            return products.id_category == productD.id_category
                        }
                    })
                    let relatedProduct=[];
                    if(related_product_list.length>=3){
                        let length= related_product_list.length;              
                        for (let i=0; i<3;i++){
                            let relatedProduct_random_position= Math.floor(Math.random()*length /* related_product_list.length */);
                            if(relatedProduct.length==0){
                                relatedProduct.push(related_product_list[relatedProduct_random_position]);
                            } else {
                                let is_inside= relatedProduct.find(product_founded=>
                                    product_founded.id==related_product_list[relatedProduct_random_position].id)
                                    if(is_inside){
                                        i--
                                    } else {
                                        relatedProduct.push(related_product_list[relatedProduct_random_position]);
                                    }
                            }
                        }
                    } else {
                        relatedProduct= related_product_list;  
                    }
                    res.render('products/productDetail', {productD , relatedProduct , user:req.session.userLogged})
                }
                else {
                    res.redirect("/error")
                }
            }
            else {
                res.redirect("/error")
            }     
        })    
    },    
         // let idProd = req.params.id
        // let productD = ''

        // for(let i=0; i<productListOl.length; i++){
        //     if(productListOl[i].id == idProd){
        //         productD = productListOl[i]
        //     }
        // }

        //     let relatedProduct = productListOl.filter((e)=>{
        //         return e.category == productD.category
        // })
    edit: function(req,res){
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll(); 
        Promise.all([product, category])
        .then(function([product, category]){
            res.render('products/editProduct', {product, category})
        })
        // let idProduct= req.params.id;
        // let product= productListOl.find(element=>element.id==idProduct);
        // //console.log(product);
        // //let product= productListOl[idProduct-1]
        // res.render('products/editProduct',{product});
    },

    list: function(req,res){
        db.product.findAll({
            where: {
                
                showing: { [Op.gt]: 0 }
            }
        })
        .then(function(productsStockOn){
            let user;
            if(req.session.userLogged){
                user= req.session.userLogged.id;
            }
            productsStockOn.sort((a,b)=> (a.id_category > b.id_category ? 1 : -1))
            return res.render("products/productList", {productsStockOn, user});
        })
    },
    processForm: function(req,res){  
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            db.category.findAll()
            .then(function(category){ 
                return res.render('products/createProduct', {category, mensajeError: errors.mapped(), old:req.body})
            })
        }
        else {
            let showing= req.body.showing;
            let imageProduct;
            if(req.file){
                imageProduct=req.file.filename;
            } else{
                imageProduct='';
            }
            db.product.create(
                {
                name: req.body.name,
                id_category: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                image_product: imageProduct,
                showing: showing
            });
            res.redirect("/product/panel")
        }
        /*
        let imageProduct;
        if(req.file){
            imageProduct=req.file.filename;
        } else{
            imageProduct='';
        }
      
        db.product.create(
            {
            name: req.body.name,
            id_category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image_product: imageProduct,
        });
        res.redirect("/product")
        */
    },
    update:(req,res)=>{
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll(); 
        Promise.all([product, category])
            .then(function([product, category]){ 
                let showing= req.body.showing;
                let errors = validationResult(req);
                if(!errors.isEmpty()){ 
                    return res.render('products/editProduct', {product, category, mensajeError: errors.mapped(), old: req.body})                
                }
                else if(req.file){
                    if(product.image_product!=""){ 
                        fs.unlinkSync(path.join(__dirname+'/../../public/imagenes/productImages/'+ product.image_product));  
                    }
                    /*
                    const objNewImage= req.files.productImage;
                    let imageProduct_name= Date.now() + path.extname(objNewImage.name);
                    objNewImage.mv(productImages_path+imageProduct_name,(err)=>{
                        if (err) {
                            // aqui deberia redirigir a la pagina de error
                            return res.send("Hubo un error");
                        }
                    });
                    */
                    db.product.update({
                        name: req.body.name,
                        id_category: req.body.category,
                        description: req.body.description,
                        stock: req.body.stock,
                        price: req.body.price,
                        image_product: req.file.filename,
                        showing: showing
                        }, {
                            where: {id:req.params.id}
                        })               
                }      
                else if (req.body.deleteImage) {
                    fs.unlinkSync(path.join(__dirname+'/../../public/imagenes/productImages/'+ product.image_product));  
                    db.product.update({ 
                        name: req.body.name,
                        id_category: req.body.category,
                        description: req.body.description,
                        stock: req.body.stock,
                        price: req.body.price,
                        image_product: "",
                        showing: showing
                        },
                        {
                            where: {id:req.params.id}
                        })
                }
                else  {
                    db.product.update({ 
                    name: req.body.name,
                    id_category: req.body.category,
                    description: req.body.description,
                    stock: req.body.stock,
                    price: req.body.price,
                    showing: showing
                    },
                    {
                        where: {id:req.params.id}
                    })          
                }
                res.redirect('/product/panel')
            })
        /*
        let imageProduct;
        if(req.file){
            imageProduct=req.file.filename;
        };
        if(imageProduct){
            db.product.update({
            name: req.body.name,
            id_category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image_product: imageProduct,
            }, {
                where: {id:req.params.id}
            })           
        }      
        else if (req.body.deleteImage) {
            db.product.update({ 
                name: req.body.name,
                id_category: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                image_product: "",
                },
                {
                    where: {id:req.params.id}
                })
        }
        else  {
            db.product.update({ 
            name: req.body.name,
            id_category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            },
            {
                where: {id:req.params.id}
            })           
        }
        res.redirect('/product')
        */
    },
    //     idProduct= req.params.id;
    //     let productToMidyfy= productListOl.find(element=>element.id==idProduct);
    //     let modifiedProduct={
    //         id: idProduct,
    //         name: req.body.name,
    //         category: req.body.category,
    //         price: req.body.price,
    //         payWay: req.body.payWay,
    //         cuotas: req.body.cuotas,
    //         interest: req.body.interest,
    //         description: req.body.description
    //     }
    //     if(req.file){
    //         modifiedProduct.productImage=req.file.filename;
    //     } else if (req.body.deleteImage=='on'){
    //         modifiedProduct.productImage='';
    //     } else{
    //         modifiedProduct.productImage=productToMidyfy.productImage;
    //     }
    //     modifiedProduct.inStock= true;
    //     //splice sirve si no se borra nunca ningun producto del json
    //     //productListOl.splice((idProduct-1),1,modifiedProduct);
    //     //splice sirve si no se borra nunca ningun producto del json
    //     for(let i=0; i<productListOl.length;i++){
    //         if(productListOl[i].id==modifiedProduct.id){
    //             productListOl[i]=modifiedProduct;
    //             break;
    //         }
    //     }
    //     console.log(req.body.deleteImage);
    //     let productListOlupdated= JSON.stringify(productListOl, null, " ");
    //     fs.writeFileSync(productListPath, productListOlupdated)
    //     res.redirect('/product');
    // },

    controlPanel: function(req,res){
        db.product.findAll()
        .then(function(products){
            //return res.send(products)
            let accesorios=[];
            let combos=[];
            let macetas=[];
            let plantas=[];
            let terrarios=[];
            for (product of products){
                let item={
                    id: product.id,
                    name: product.name,
                    image: product.image_product,
                    showing: product.showing
                }
                switch (product.id_category){
                    case 1:
                        plantas.push(item);
                        break;
                    case 2:
                        combos.push(item);
                        break;
                    case 3:
                        macetas.push(item);
                        break;
                    case 4:
                        terrarios.push(item);
                        break;
                    case 5:
                        accesorios.push(item);
                        break;
                }
            } 
            return res.render("products/panel", {accesorios, combos, macetas, plantas, terrarios});
        })
    },






    destroy: function(req,res){
    db.product.update({
        showing: 0
    }, {where : {id: req.params.id}

    })
    res.redirect('/product');
    },
    allProducts: (req , res) => {
        let products = db.product.findAll({include: [{association: 'category'}]})
        let categories = db.category.findAll({ group: 'name' });

        Promise.all([products, categories])
            
            .then(function([products, categories]){

                let accesorios=0;
                let combos=0;
                let macetas=0;
                let plantas=0;
                let terrarios=0;
                for (let i=0; i<products.length;i++){
                    switch (products[i].id_category){
                        case 1:
                            plantas++;
                            break;
                        case 2:
                            combos++;
                            break;
                        case 3:
                            macetas++;
                            break;
                        case 4:
                            terrarios++;
                            break;
                        case 5:
                            accesorios++;
                            break;
                    }
                }

                let arrayCategories= [];
                for (category of categories){
                    arrayCategories.push({name:category.dataValues.name});
                }
                arrayCategories[0].totalProducts= accesorios;
                arrayCategories[1].totalProducts= combos;
                arrayCategories[2].totalProducts= macetas;
                arrayCategories[3].totalProducts= plantas;
                arrayCategories[4].totalProducts= terrarios;

                let productArray = [];
                for(let i=0; i<products.length; i++){
                    let oneProduct ={
                        id: products[i].id,
                        name: products[i].name,
                        id_category: products[i].id_category,
                        description: products[i].description,
                        stock: products[i].stock,
                        image_product: "https://mameli.herokuapp.com/imagenes/productImages/" + products[i].image_product,
                        price: products[i].price,
                        showing: products[i].showing
                    }
                    productArray.push(oneProduct)
                }
                return res.status(200).json({
                    count: productArray.length,
                    countByCategory: arrayCategories,
                    products: productArray,
                    status: 200
                })
            })
    },
    totalCategories: (req , res) => {
        db.category.count()
            .then(totalCategories => {
                return res.status(200).json({
                    totalCategories: totalCategories,
                    status: 200
                })
            })
    },
    oneProduct: (req , res) => {
        db.product.findByPk(req.params.id,{include: [{association: 'category'}]})
            .then( oneProduct => {
                if(oneProduct==null){
                    res.send("Product not found")
                }
                else {
                    let theProduct = {
                        id: oneProduct.id,
                        name: oneProduct.name,
                        //id_category: oneProduct.id_category,
                        name_category: oneProduct.category.name,
                        description: oneProduct.description,
                        stock: oneProduct.stock,
                        image_product: "https://mameli.herokuapp.com/imagenes/productImages/" + oneProduct.image_product,
                        price: oneProduct.price,
                        showing: oneProduct.showing
                    }
                    return res.status(200).json({
                        data: theProduct,
                        status: 200
                    })
                }
            })    
    }
}

module.exports = productController;
    
    // Enpoints products evrsion I
    /* 
    allProducts: (req , res) => {
    db.product.findAll()
        .then (products => {
            let productArray = [];
            for(let i=0; i<products.length; i++){
                let oneProduct ={
                    id: products[i].id,
                    name: products[i].name,
                    id_category: products[i].id_category,
                    description: products[i].description,
                    stock: products[i].stock,
                    image_product: "https://mameli.herokuapp.com/imagenes/productImages/" + products[i].image_product,
                    price: products[i].price,
                    showing: products[i].showing
                }
                productArray.push(oneProduct)
            }
                return res.status(200).json({
                total: products.length,
                data: productArray,
                status: 200
            })
        })
    },
   
    oneProduct: (req , res) => {
        db.product.findByPk(req.params.id)
            .then( oneProduct => {
                let theProduct = {
                    id: oneProduct.id,
                    name: oneProduct.name,
                    id_category: oneProduct.id_category,
                    description: oneProduct.description,
                    stock: oneProduct.stock,
                    image_product: "https://mameli.herokuapp.com/imagenes/productImages/" + oneProduct.image_product,
                    price: oneProduct.price,
                    showing: oneProduct.showing
                }
                return res.status(200).json({
                    data: theProduct,
                    status: 200
                })
            })    
    }
    */
    // Enpoints products evrsion I


    

    // function(req,res){
    //     let id= req.params.id;
    //     for(let i=0; i<productListOl.length; i++){
    //         if(productListOl[i].id==id){
    //             productListOl[i].inStock= false;

    //             // bloque de codigo para borrar fisicamente el registro en el json
    //             /*if(productListOl[i].productImage){
    //                 var imageToDelete= productListOl[i].productImage;
    //             }
    //             productListOl.splice(i,1);*/
    //             // bloque de codigo para borrar fisicamente el registro en el json
                
    //         }
    //         break;
    //     };

    //     // bloque de codigo para borrar la imagen fisicamente
    //     /*if(imageToDelete){
    //         fs.unlinkSync(path.join(__dirname, '../../public/imagenes/productImages/')+imageToDelete);
    //     }*/
    //     // bloque de codigo para borrar la imagen fisicamente

    //     fs.writeFileSync(productListPath,  JSON.stringify(productListOl, null, " "));
    //     res.redirect('/product');   
    // }



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