function adminUser(req, res, next) {
		let logged = req.session.userLogged;
        if(logged.admin == 0){
            res.redirect ("/product")
	}
	next();
}

module.exports = adminUser;