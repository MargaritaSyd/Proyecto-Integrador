let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');
//const userLogin = require('../models/User')

let db = require("../dataBase/models");
let Op = db.Sequelize.Op;

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
       // if(req.cookies.userEmail){
       //     console.log(req.cookies.userEmail);
       // } else {
       //     console.log('No hay cookie');
       // }
        //comprobacion de como funcionan las cookies
        res.render('users/profile',{user:req.session.userLogged}); 
    },

    login: function(req,res){
        res.render('users/login'); 
    },

    loginProcess: function(req,res){   
    let errorMessage= 'Las credenciales son inválidas';

    db.user.findOne( {
        where: {
            email: req.body.email
        }
    })
    .then(function(userToLog){
        let passwordOk= bcryptjs.compareSync(req.body.password , userToLog.password)
               if(passwordOk){ 
                    req.session.userLogged= userToLog;   
               } else { 
                    res.render('users/login',{errorMessage})
               }})
    .then(function(){
        res.redirect('/users/profile')
    })         
    .catch(function(e){
        return res.render('users/login',{errorMessage})
    })
    },
/*    
    for(let i=0; i<userListOl.length; i++){
           if(req.body.email == userListOl[i].email){
               let userToLog = userListOl[i] 
               let passwordOk= bcryptjs.compareSync(req.body.password , userListOl[i].password)
               if(passwordOk){ 
                    req.session.userLogged= userToLog;
               } else { 
                    res.render('users/login',{errorMessage})
               }//} else {
            // res.render('users/login',{errorMessage})
               }
            }
            return res.redirect('/users/profile')
           
    
    let userToLogin = userLogin.findByField('email', req.body.email);      
    if(userToLogin){
        //return res.send('Bienvenido señor '+ userToLogin.lastNameUser)
        let passwordOk= bcryptjs.compareSync(req.body.password,userToLogin.password);
        //return res.send(passwordOk)
         
        if(passwordOk){ 
        //    delete userToLogin.password;
            req.session.userLogged= userToLogin;


        //    if(req.body.remember_user){
        //        res.cookie('userEmail',req.body.email, {maxAge: 1000*15});
            }
            
            return res.redirect('/users/profile');
        } else {
        return res.render('users/login',{errorMessage});
    }
    return res.render('users/login',{errorMessage});    
    
*/
    //    for(let i=0; i<userListOl.length; i++){

    //        if((req.body.email == userListOl[i].email)&&(bcryptjs.compareSync(req.body.password , userListOl[i].password))
    //        ){ res.send('Datos correctos')
    //} else {
    //    res.send('Datos incorrectos')
//}}




    storeRegister: function(req,res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('users/register' , {mensajeError : errors.array() , old:req.body})
        };
        db.user.findOne( {
            where: {
                email: req.body.email
            }
        })
        .then(function(user){
            if(user){
                return res.render('users/register' , {mensajeError: [{msg:"Ya existe un usuario registrado con este email."}]})
            } else {
                let userImage;
                if(req.file){
                    userImage=req.file.filename;
                } else{
                    userImage='';
                }
                db.user.create(
                    {
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password , 10),
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: userImage 
                        
                    });
                res.redirect("/users/profile")
            }
            
        })

       
        
        




        /*
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
        res.redirect('/users/profile')  
    */
   

    },

    logout: function(req , res){
        //res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/')
    },
    
    editProfile: function(req,res){
        let userToLog = req.session.userLogged;
        db.user.findByPk(userToLog.id)
            .then(function(user){
                return res.render('users/editProfile',{user});
            })       
    },

    updateProfile: function(req,res){
        let userToLog = req.session.userLogged;
        db.user.findByPk(userToLog.id)
            .then(function(user){
                let userImages_path= path.join(__dirname+'../../../public/imagenes/userImages/');
                let errors = [];
                if(!errors.isEmpty()){
                    return res.render('users/editProfile', {user, mensajeError: errors.array()})    
                }
                else if(req.files){
                    const objNewImage= req.files.userImage;
                    let imageUser_name= Date.now() + path.extname(objNewImage.name);
                    objNewImage.mv(userImages_path + imageUser_name,(err)=>{
                        if (err) {
                            // aqui deberia redirigir a la pagina de error
                            return res.render("error");
                        }
                    });
                    db.user.update({
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password , 10),
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: imageUser_name,             
                    },{
                        where: {id:user.id}
                    })
                }    
                else if (req.body.deleteImage) {
                    let imageToDelete_path= userImages_path + user.user_image;
                    fs.unlinkSync(imageToDelete_path); 
                    db.user.update({ 
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password , 10),
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: "",
                        },
                        {
                            where: {id:user.id}
                        })                            
                }
                else  {
                    db.user.update({ 
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password , 10),
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                    },
                    {
                        where: {id:user.id}
                    })                               
                }   
                req.session.destroy()
                return res.redirect('/users/login');    
            })       
    }
    
}

module.exports = userController;