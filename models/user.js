const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, required: true },
    createdlc: { type: String, required: true },
});
module.exports = mongoose.model('user', userSchema);