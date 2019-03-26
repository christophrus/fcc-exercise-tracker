const User = require('../models/User');

exports.addUser = function (req, res, next) {

    const { username } = req.body;

    if(!username) {
        return next({message: "Username is required"});
    }

    const newUser = new User({
        name: username
    })

    newUser.save(function (err, savedUser) {

        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return next({ message: 'Username is already taken' });
            }
            return next(err);
        }

        res.json(savedUser.toObject());
    });
}