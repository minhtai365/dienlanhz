const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var catelogieSchema=new Schema({
    name:{type:String,required:true},
    created:{type:Date,required:true},
    createdlc:{type:String,required:true},
})
module.exports=mongoose.model('catelogies',catelogieSchema);