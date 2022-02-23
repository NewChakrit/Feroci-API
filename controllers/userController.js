const fs = require('fs');
const { User } = require('../models');
const util = require('util');

exports.getme = async (req, res, next) => {
    try {
        const user = await User.findOne({
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt'],
            },
            where: { id: req.user.id },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};
