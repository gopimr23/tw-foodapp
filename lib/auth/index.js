const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require('./user-model');
const bCrypt = require('bcrypt');

// Generates hash using bCrypt
const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, email, password, done) {
        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({'email': email},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new UserModel();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

passport.use(new LocalStrategy((email, password, done) => {
        UserModel.findOne({ 'email' :  email },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with email '+email);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
