module.exports = {
    validateUser,
    validateUserLogin
}


function validateUser(req, res, next) {
    const { username, email, password } = req.body;

    if (username && email && password) {
        next();
    } else {
        res.status(400).json({ message: 'Please provide a username, email, and password.' })
    }
}

function validateUserLogin(req, res, next) {
    const { username, password } = req.body;

    if (username && password) {
        next();
    } else {
        res.status(400).json({ message: 'Please provide a username and password.' })
    }
}
