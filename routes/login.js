
exports.loginpage=function(req, res) {
	res.render('pages/login',{message: req.flash('message')});
};

exports.logOut=function(req, res) {
    req.logout();
    res.redirect('/login');
};