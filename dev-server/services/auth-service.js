const jwt = require('jsonwebtoken');
const secret = 'supersecretivepleasedontuseit';

function generateJWT(user) {
    const tokenData = { username: user[0].username, id: user[0]._id };
    return jwt.sign({ user: tokenData }, secret);
}

function requireLogin(req, res, next) {
    console.log('On the requireLogin');
    const token = decodeToken(req);

    if (!token) {
        return res.status(401).json({message: 'You must be logged in.'});
    }
    next();
}

function decodeToken(req) {
    console.log('Decoding token ' + req);
    const token = req.headers.authorization || req.headers['authorization'];

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

function getUsername(req) {
    console.log('Gettting username');
    const token = decodeToken(req);
    if (!token) {
        return null;
    }

    return token.user.username;
}

function getUserId(req) {
    console.log('Gettting userid');
    const token = decodeToken(req);
    if (!token) {
        return null
    } 
    return token.user.id;
}

module.exports = {
    generateJWT,
    decodeToken,
    requireLogin,
    getUsername,
    getUserId
};