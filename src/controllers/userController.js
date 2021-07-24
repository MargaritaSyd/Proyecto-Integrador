let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');
let userListOl ;
if (userDatos == "") {
    userListOl = [];
} 
else { 
    userListOl = JSON.parse(userDatos);
};

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

    loginProcess: function(req,res){
        console.log(req.body)
        res.send ('hola')
    
    },
//        for(let i=0; i<userListOl.length; i++){
//
//            if((req.body.email == userListOl[i].email)&&(bcryptjs.compareSync(req.body.password , userListOl[i].password))
//            ){ res.send('Datos correctos')
//    } else {
//        res.send('Datos incorrectos')
//    }}},


    storeRegister: function(req,res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('users/register' , {mensajeError : errors.array() , old:req.body})
        };

        for(let i=0; i<userListOl.length; i++){
            if(req.body.email == userListOl[i].email){
               return res.render('users/register' , {mensajeError: [{msg:"Este mail es invalido"}]})
            } }

        let newUser= {
            id: userListOl.length+1,
            user: req.body.user,
            lastNameUser: req.body.lastNameUser,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password , 10)
        };
        if(req.file){
            newUser.userImage=req.file.filename;
        } else{
            newUser.userImage='';
        }


        userListOl.push(newUser);
        let userListOlupdated= JSON.stringify(userListOl, null, " ");
        fs.writeFileSync(userListPath, userListOlupdated)
        res.redirect('/')
   

    }
    
}

module.exports = userController;