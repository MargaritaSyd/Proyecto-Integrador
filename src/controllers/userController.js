let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
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

    storeRegister: function(req,res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('register' , {mensajeError : errors.mapped() , old:req.body})
        }

        let newUser= {
            id: userListOl.length+1,
            user: req.body.user,
            lastNameUser: req.body.lastNameUser,
            email: req.body.email,
            password: req.body.password //hashear!!
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