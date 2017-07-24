var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('./models/user.js');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		//return the unique id for the user
		 return done(null, user._id);
	});

	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(id, done) {

		User.findById(id, function(err, user){
			if(err){
				return done(err, false);
			}
			if(!user){
				return done('user not found', false);
			}
			return done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			console.log("formData");
			User.findOne({username: username}, function(err, user){
				if(err){
					return done(err, false)
				}
				if(!user){
					return done('user' + username + 'not found!', false);
				}
				if(!isValidPassword(user, password)){
					return done('incorrect password', false);
				}
				console.log(username + ' logged in');
				return done(null, user);
			})
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			User.findOne({username: username}, function(err, user){

				if(err){
					return done(err, false);
				}
				if(user){
					return done('username already taken', false);
				}
				else{
				var user = new User();
				user.username = username;
				user.password = createHash(password);

				user.save(function(err, user){
					if(err){
						return done(err, false)
					}
					console.log('successfully signed up user: ' + username);
					return done(null, user)
				})
				}

			});
		}
	));
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};