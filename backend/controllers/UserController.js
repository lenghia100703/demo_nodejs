const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
    // [GET] /v1/user/
    show: async (req, res, next) => {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // [DELETE] /v1/user/:id
    delete: (req, res, next) => {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = authController;
