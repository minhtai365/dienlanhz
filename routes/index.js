var express = require('express');
var router = express.Router();

var multer = require('multer');
//connect database
// const mongoose = require('mongoose');
var Product = require('../models/product');
var Service = require('../models/service');
var Catelogies = require('../models/catelogie');
var Imgslide = require('../models/slide');
var Promotion = require('../models/promotion');
var multipart = require('connect-multiparty');
const { cloudinary } = require('../cdn/cloudinary');
const streamifier = require('streamifier')
var multipartMiddleware = multipart();
//xóa Service
const fileUpload = multer()

router.post('/upload-file', fileUpload.single('upload'), async (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  async function upload(req) {
    let result = await streamUpload(req);
    if (result) {
      let data = result.url
      // let arr = []
      // let obj = { default: data };
      // let obj2 = { 138: data,218: data,2988: data, default: data};
      // arr.push(obj2);
      // arr.push(obj)
      res.status(200).json({
        uploaded:true,
        url:data
      })
    }
  }
  upload(req);
});
router.post('/item', (req, res, next) => {
  const id = req.body._id;
  Service.deleteOne({ _id: id })
    .then(re => {
      res.status(200).json({ mess: 'Thành công', status: true })
    })
    .catch(
      //xóa catelogies
      Catelogies.deleteOne({ _id: id })
        .then(resp => {
          deletePro(id);
          res.status(200).json({ mess: 'Thành công', status: true })
        })
        .catch(err => {
          deletePro(id);
          deleteImg(id);
          deletePromotion(id);
        }
        )
    )
})
//Xóa product
function deletePro(id) {
  Product.deleteOne({ _id: id })
    .then(resp => {
      res.status(200).json({ mess: 'Thành công', status: true })
    })
  Product.deleteMany({ catelogyid: id })
    .then(resp => {
      res.status(200).json({ mess: 'Thành công', status: true })
    })
}
//Xóa slide
function deleteImg(id) {
  Imgslide.deleteOne({ _id: id })
    .then(resp => {
      res.status(200).json({ mess: 'Thành công', status: true })
    })
}//Xóa Khuyến mãi
function deletePromotion(id) {
  Promotion.deleteOne({ _id: id })
    .then(resp => {
      res.status(200).json({ mess: 'Thành công', status: true })
    })
}
module.exports = router;

// var MogoCl=require('mongodb').MongoClient;
// var url="mongodb://localhost:27017/";
// MogoCl.connect(url,function(err,db){
//   if(err) throw err;
//   var dt=db.db("my-database");
//   dt.collection("user").findOne({roleid:"1"},function(err,res){
//     if(err) throw err;
//     dt.close();
//   })
// })
