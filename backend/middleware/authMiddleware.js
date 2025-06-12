    const jwt = require('jsonwebtoken');

    module.exports = function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
            if (!token) {
                return res.status(403).json({ message: 'Користувач не авторизований' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // ВИПРАВЛЕНО
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: 'Користувач не авторизований' });
        }
    };