const jwt = require('jsonwebtoken');
const secrets = require('../../secrets/secrets.js');

const Users = require('../../models/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
      if (err) res.status(401).json({ message: 'Invalid Token' });
      Users.findById(decodedToken.id).then(user => {
        if (!user) {
          res.status(401).json({ message: 'Invalid Credentials' });
        } else {
          console.log(user);
          req.user = {
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email
          };
          next();
        }
      });
    });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
};
