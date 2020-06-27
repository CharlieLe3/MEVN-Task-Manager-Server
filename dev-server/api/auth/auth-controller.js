const StringUtil = require('../../utilities/string-util');
const User = require('../../model/user-model');
const JWT = require('../../services/auth-service');

async function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    User.find({ username: req.body.username.toLowerCase() }, (error, user) => {
        console.log('This is the user found in logging in: ' + user);
        if (error) {
            // Temp
            console.log('Something straight up went wrong in auth server?');
            return res.status(500).json();
        }

        if (!user) {
            // Temp
            console.log('could not find user');
            return res.status(401).json();
        }

        const passwordMatch = User.passwordMatch(req.body.password, user[0].password);
        if (!passwordMatch) {
            // Temp
            console.log('Passwords do not match');
            return res.status(401).json();
        }

        const token = JWT.generateJWT(user);
        // Temp
        console.log(`Generating token... ${token}`);
        return res.status(200).json({ token: token });
    });
}

function validateIndex(body) {
    let errors = '';

    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}

module.exports = {
    index,
    validateIndex
};