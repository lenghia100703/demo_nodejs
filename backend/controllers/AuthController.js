const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

let REFRESH_TOKENS = [];

const authController = {
    // [POST] /v1/auth/register
    register: async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
            });

            const user = await newUser.save();
            res.status(200).json(user);
            return;
        } catch (err) {
            res.status(500).json(err);
            return;
        }
    },

    // [POST] /v1/auth/login
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json('Wrong username');
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).json('Wrong password');
            }
            const payload = {
                _id: user.id,
                admin: user.admin,
            };
            if (user && validPassword) {
                const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
                    expiresIn: '30s',
                });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
                    expiresIn: '1d',
                });

                REFRESH_TOKENS.push(refreshToken);

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: false,
                    path: '/',
                });
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
                return;
            }
        } catch (err) {
            res.status(500).json(err);
            return;
        }
    },

    // [POST] /v1/auth/logout
    logout: async (req, res, next) => {
        res.clearCookie('refreshToken');
        REFRESH_TOKENS = REFRESH_TOKENS.filter((token) => token !== req.cookies.refreshToken);
        return res.status(200).json('Logout successful');
    },

    // [POST] /v1/auth/refresh
    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json('You are not authenticated');
            }

            if (!REFRESH_TOKENS.includes(refreshToken)) {
                return res.status(403).json('Refresh Token is invalid');
            }

            jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
                if (err) {
                    console.log(err);
                }

                REFRESH_TOKENS = REFRESH_TOKENS.filter((token) => token !== refreshToken);

                const payload = {
                    _id: user.id,
                    admin: user.admin,
                };
                const newAccessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
                    expiresIn: '30s',
                });

                const newRefreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
                    expiresIn: '1d',
                });

                REFRESH_TOKENS.push(newRefreshToken);

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: false,
                    path: '/',
                });

                return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            });
            return res.status(200).json(refreshToken);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = authController;
