const UserModel = require('./user-model');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');

// Generates hash using bCrypt
const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

const secret = "FoodHubSecret";

class Auth {
    static login(req, res) {
        UserModel.findOne({ 'email' :  req.body.email },
            function(err, user) {
                if (err)
                    res.json({
                        message: 'Internal error',
                        error: err
                    });
                if (!user){
                    console.log('User Not Found with email '+email);
                    res.json({
                        message: "No user found"
                    })
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    res.json({
                        message: "Invalid Password"
                    })
                }
                const payload = {
                    email: req.body.email
                };

                const token = jwt.sign(payload, secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    token
                });
            }
        );
    }

    static register(req, res) {
        User.findOne({'email': email},function(err, user) {
            // In case of any error return
            if (err){
                res.json({
                    message: 'Internal error',
                    error: err
                });
            }
            // already exists
            if (user) {
                console.log('User Not Found with email '+email);
                res.json({
                    message: "User already exist"
                });
            } else {
                // if there is no user with that email
                // create the user
                const newUser = new UserModel();
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
                        res.status(500).send(err);
                    }
                    console.log('User Registration succesful');
                    res.status(201).send(newUser.toJSON());
                });
            }
        })
    }

    static verifyToken(req, res, next) {
        jwt.verify(req.headers.token, secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = Auth;