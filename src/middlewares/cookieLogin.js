const { ResultWithContext } = require('express-validator/src/chain');
const User = require('../models/User');

function cookieLogin(req, res, next) {
   
    let emailInCookie = req.cookies.userEmail;
    //console.log(emailInCookie);
    let userFromCookie= User.findByField('email',emailInCookie);
    //console.log(userFromCookie);

    if (userFromCookie){
        delete userFromCookie.password;
        req.session.userLogged=userFromCookie;
    
        //console.log(userFromCookie.user+' está logueado y cookeado');
        
    } else if(req.session.userLogged){
        //console.log(req.session.userLogged.user + ' está logueado pero no cookeado');
    } else {
        //console.log('No hay ningún usuario logueado');
    }

	next();
}

module.exports = cookieLogin;