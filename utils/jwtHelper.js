const jwt = require('jsonwebtoken');

module.exports.sign = data => jwt.sign(data, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '365d' });

module.exports.verify = token => jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
