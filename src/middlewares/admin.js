function adminUser(req, res, next) {
	let logged = req.session.userLogged;
	if((!logged) || (logged.admin == 0)){
		res.redirect ("/product")
	}
	next();
}

module.exports = adminUser;