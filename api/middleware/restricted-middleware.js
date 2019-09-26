const jwt = require('jsonwebtoken');
const secrets = require('../../secrets/secrets.js');

const Users = require('../../models/users-model.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken.id) throw new Error('Invalid Token');

        Users.findById(decodedToken.id).then(user => {
          if (!user) {
            throw new Error('Invalid Token');
          } else {
            console.log(user);
            req.user = {
              id: decodedToken.id,
              username: decodedToken.username,
              email: decodedToken.email,
            };
            next();
          }
        });
      });
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (err) {
    res.status(401).json({ message: err.toString() });
  }
};
