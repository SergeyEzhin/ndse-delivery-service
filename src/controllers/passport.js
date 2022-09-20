const LocalStrategy = require('passport-local').Strategy;
const UsersService = require("../services/User");
const bcrypt = require('bcryptjs');
const {User} = require("../models");

const passportAuth = passport => {
    passport.use(
        new LocalStrategy(
            {usernameField: 'email'},
            async (email, password, done) => {
                // Match User
                const user = await UsersService.findByEmail(email);

                if (!user) {
                    console.log('This email is not registered');
                    return done(null, false, {error: 'This email is not registered', status: 'error'});
                }

                // Match password
                bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        console.log('Incorrect login or password');
                        return done(null, false, {error: 'Incorrect login or password', status: 'error'});
                    }
                });
            }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = passportAuth;