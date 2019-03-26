const User = require('../models/User');
const Exercise = require('../models/Exercise');
const moment = require('moment');

exports.getLog = function (req, res, next) {

    let { userId, from, to, limit, order } = req.query;
    from = new Date(from) == 'Invalid Date' ? 0 : new Date(from);
    to = new Date(to) == 'Invalid Date' ? new Date() : new Date(to);
    limit = isNaN(parseInt(limit)) ? 0 : parseInt(limit);
    order = order == 'asc' ? '' : '-';

    User.findOne( { id: userId }, function(err, foundUser) {

        if (err) {
            console.log(err);
            return next(err);
        }

        if (foundUser) {

            Exercise
                .find({ user: foundUser._id }).
                select('description duration date -_id').
                where('date').gte(from).lte(to).
                sort(order + 'date').
                limit(limit).
                exec(function(err, foundExercises) {

                    if (err) {
                        console.log(err);
                        return next(err);
                    }

                    if (foundExercises) {
                        
                        ret = {
                            id: foundUser.id,
                            name: foundUser.name,
                            exercises: foundExercises.map(el => ({
                                description: el.description,
                                duration: el.duration,
                                date: moment(el.date).format('YYYY-MM-DD')
                            }))
                        }
                        res.json(ret);
                    } else {
                        next({message: 'No Exercises found'});
                    }
                    
                    
                });
        } else {
            next({message: 'User not found'});
        }
    
    });
    
}