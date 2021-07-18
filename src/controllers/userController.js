let userController = {
    register: function(req,res){
        res.render('users/register');
    },
    profile: function(req,res){
        res.render('users/profile'); 
    },

    login: function(req,res){
        res.render('users/login'); 
    },

    storeRegister: function(req,res){

       
    }
    // processForm: function(req,res){
    //     let newProduct= {
    //         id: productListOl.length+1,
    //         name: req.body.name,
    //         category: req.body.category,
    //         price: req.body.price,
    //         payWay: req.body.PayWay,
    //         cuotas: req.body.cuotas,
    //         interest: req.body.interest,
    //         description: req.body.description
    //     };

    //     if(req.file){
    //         newProduct.productImage=req.file.filename;
    //     } else{
    //         newProduct.productImage='';
    //     }
    //     newProduct.inStock= true;


    //     //console.log(req.file)
    //     productListOl.push(newProduct);
    //     let productListOlupdated= JSON.stringify(productListOl, null, " ");
    //     fs.writeFileSync(productListPath, productListOlupdated)
    //     res.redirect('/product')
    
}

module.exports = userController;