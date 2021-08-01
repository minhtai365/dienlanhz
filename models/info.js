var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var infoSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,},
    phone:{type:String,required:true},
    logo:{type:String,},
    facebook:{type:String},
    tiktok:{type:String},
    zalo:{type:String},
    youtube:{type:String},
    // gps:{type:Object},
    introduce:{type:String},
    paypolicy:{type:String,},
    shippolicy:{type:String,},
    warrantypolicy:{type:String,},
})
module.exports=mongoose.model('info',infoSchema);