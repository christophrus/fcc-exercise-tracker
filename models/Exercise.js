var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date },
});

exerciseSchema.post('save', function (doc, next) {
    doc.populate({ path: "user", select: "name id" }).execPopulate().then(function () {
        next();
    });
});

exerciseSchema.set('toObject', {
    virtuals: false,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret._id;
        ret.date = new Date(ret.date).toDateString();
    },
});

module.exports = mongoose.model('Exercise', exerciseSchema);