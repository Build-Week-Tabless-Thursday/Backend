module.exports = {
    createToken
}


function createToken(user) {
    const payload = {
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.JWT_SECRET, options);
}

