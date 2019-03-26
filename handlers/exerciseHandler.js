const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.addExercise = function (req, res, next) {

    let { userId, description, duration, date } = req.body;
    date = new Date(date);
    
    if (date == 'Invalid Date') return next({message: 'Invalid Date'});

    User.findOne( { id: userId }, function (err, foundUser) {

        if (err) {
            console.log(err);
            return next(err);
        }
        if (foundUser) {

            let newExercise = new Exercise({ user: foundUser, description, duration, date });
            newExercise.save(function (err, savedExercise) {

                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.json(savedExercise.toObject());
            });
        } else {
            return next({message: "userId not found"});
        }
    });
}