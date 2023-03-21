const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        const accessToken = token.split(' ')[1];

        jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
            if (token) {
                if (err) {
                    return res.status(403).json('Token is invalid');
                }
                req.user = user;
                next();
            } else {
                return res.status(401).json("You're not login");
            }
        });
    },

    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user._id === req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json('You are not allowed to delete other');
            }
        });
    },
};

module.exports = middlewareController;
