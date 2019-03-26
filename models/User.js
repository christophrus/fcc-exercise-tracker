var mongoose = require("mongoose");
var tools = require('../functions/tools');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: { type: String, index: true, default: tools.makeid },
    name: { type: String, required: true, unique: true }
});

userSchema.set('toObject', {
    virtuals: false,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret._id;
    },
});
module.exports = mongoose.model('User', userSchema);