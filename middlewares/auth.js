const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                msg: 'Authorization token not found',
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ msg: 'Error in authentication' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.json({ msg: 'Error in authentication' });
    }
};

exports.authAccounts = authMiddleware;
