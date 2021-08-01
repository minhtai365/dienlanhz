const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var serviceSchema=new Schema({
    name:{type:String,required:true},
    post:{type:String,required:true},
    // posts:[{
    //     title:{type:String,required:true},
    //     detail:{type:String,required:true,
    //     img:{type:String}
    //     }}],
    created:{type:Date,required:true},
    createdlc:{type:String,required:true},
})
module.exports=mongoose.model('service',serviceSchema);