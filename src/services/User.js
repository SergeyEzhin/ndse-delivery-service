const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

class UsersService {
     create(data) {
        const { name, email, password, contactPhone } = data;

        if(name.length && email.length && password.length) {
            const userByEmail = this.findByEmail(email);

            if (!userByEmail) {
                const newUser = new UserModel({name, email, passwordHash: password, contactPhone});

                return new Promise((resolve, reject) => {
                    bcrypt.genSalt(10, async (err, salt) => {
                        bcrypt.hash(newUser.passwordHash, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.passwordHash = hash;
                            console.log(newUser);

                            newUser.save()
                                .then(user => {
                                    resolve(user);
                                })
                                .catch(err => {
                                    console.log(err);
                                    reject(err);
                                });
                        });
                    });
                });
            }
        }
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({email: email}).then(user => {
                if(user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
    }
}

module.exports = new UsersService();