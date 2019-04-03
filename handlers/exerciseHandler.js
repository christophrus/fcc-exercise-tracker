const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.addExercise = function (req, res, next) {

    let { userId, description, duration, date } = req.body;
    date = (date === "" || typeof date === 'undefined' ) ? new Date() : new Date(date);
    
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

                let ret = {
                    _id: savedExercise.user.id,
                    username: savedExercise.user.name,
                    description: savedExercise.description,
                    duration: savedExercise.duration,
                    date: savedExercise.date
                };

                res.json(ret);
            });
        } else {
            return next({message: "userId not found"});
        }
    });
}