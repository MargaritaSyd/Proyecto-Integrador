let userController = {
    registro: function(req,res){
        res.render('users/registro');
    },
    perfil: function(req,res){
        res.render('users/perfil'); 
    },

    login: function(req,res){
        res.render('users/login'); 
    }
}

module.exports = userController;