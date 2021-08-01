const mongoose = require('mongoose');
var Schema= mongoose.Schema;
var slideSchema = Schema({
    img: { type: String, required: true },
    status: { type: Boolean, required: true },
    created: { type: Date, required: true },
    createdlc:{type:String,required:true},
});
module.exports = mongoose.model('slide',slideSchema);