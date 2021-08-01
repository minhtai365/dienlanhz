const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var servicetypeSchema=new Schema({
    name:{type:String,required:true},
    created:{type:Date,required:true},
    createdlc:{type:String,required:true},
})
module.exports=mongoose.model('servicetype',servicetypeSchema);
// @
// mx(mail)
// mail.thitruongsimypham.com
// 10

// @
// TXT(T)
// v=spf1 a mx ip4: 210.211.111.87 ~all

// *
// A
// 210.211.111.87

// www
// A
// 210.211.111.87

// ftp
// A
// 210.211.111.87

// @
// A
// 210.211.111.87