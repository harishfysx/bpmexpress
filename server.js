// load the things we need
var express = require('express');
var path = require('path');

var routes = require('./routes'); // This loads index route
var about = require('./routes/about'); //This loads about route
var login= require('./routes/login'); //This loads login route

//passport
var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//var auth = require('./routes//auth');
var app = express();

// set the view engine to ejs
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

//basica authenication 
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});


//app.use(auth);

passport.use(new LocalStrategy(function(username, password, done) {
	
	if(username===password){
		var user=username;
		done(null, user) //suceesfull login
	}
	else{
		done(null, null) //falied login
	}
}));


app.post('/login',function(req,res,next){
	//console.log(req.body);
	app.locals.userName=req.body.username;
	app.locals.pass=req.body.password;
	next();
	},
passport.authenticate('local', {
    failureRedirect: '/'
}), function(req, res) {
    
    res.redirect('/about');
});

// home page 
app.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), routes.index);

//about page
app.get('/about', require('connect-ensure-login').ensureLoggedIn('/login'),about.aboutPage);

//login page
app.get('/login', login.loginpage);

//log out mechanism
app.get('/logout', login.logOut);


app.listen(3000);
console.log('3000 is the magic port');