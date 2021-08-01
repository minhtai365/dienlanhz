var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var contactSchema=new Schema({
    phone:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    name:{type:String,required:true},
    content:{type:String},
})

module.exports=mongoose.model('contact',contactSchema);