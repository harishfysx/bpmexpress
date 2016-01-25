
exports.loginpage=function(req, res) {
	res.render('pages/login');
};

exports.logOut=function(req, res) {
    req.logout();
    res.redirect('/login');
};