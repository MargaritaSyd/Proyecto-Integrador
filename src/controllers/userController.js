let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');
const userLogin = require('../models/User')

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
        //comprobacion de como funcionan las cookies
        /*if(req.cookies.userEmail){
            console.log(req.cookies.userEmail);
        } else {
            console.log('No hay cookie');
        }*/
        //comprobacion de como funcionan las cookies
        res.render('users/profile',{user:req.session.userLogged}); 
    },

    login: function(req,res){
        res.render('users/login'); 
    },

    loginProcess: function(req,res){
//        console.log(req.body)
    let errorMessage= 'Las credenciales son inválidas';
    let userToLogin = userLogin.findByField('email', req.body.email);      
    if(userToLogin){
        //return res.send('Bienvenido señor '+ userToLogin.lastNameUser)
        let passwordOk= bcryptjs.compareSync(req.body.password,userToLogin.password);
        //return res.send(passwordOk)
         
        if(passwordOk){ 
            delete userToLogin.password;
            req.session.userLogged= userToLogin;


            if(req.body.remember_user){
                res.cookie('userEmail',req.body.email, {maxAge: 1000*15});
            }
            
            return res.redirect('/users/profile');
        }
        return res.render('users/login',{errorMessage});
    }
    return res.render('users/login',{errorMessage});    
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
   

    },

    logout: function(req , res){
        res.clearCookie('userEmail');
        req.session.destroy()
        res.redirect('/')
    }   
    
}

module.exports = userController;