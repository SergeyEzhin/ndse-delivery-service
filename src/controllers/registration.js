const UsersService = require("../services/User");

const registerUser = async (req, res) => {
    const { email, password, name, contactPhone } = req.body;

    if (!email || !password || !name) {
        res.json({error: 'Please enter important fields', status: 'error'});
    }

    if (password.length < 6) {
        res.json({error: 'Password must be at least 6 characters', status: 'error'});
    }

    const user = await UsersService.findByEmail(email);

    if(user) {
        res.json({error: 'Email is already registered', status: 'error'});
    } else {
        const newUser = UsersService.create({email, password, name, contactPhone});
        console.log(newUser);
        if(newUser) {
            res.json({
                data: {
                    id: newUser._id,
                    email,
                    name,
                    contactPhone
                },
                status: 'ok'
            });
        }
    }
}

module.exports = registerUser;