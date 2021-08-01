var express = require('express');
var multer = require('multer');
// import fs from 'fs';
var router = express.Router();

var Imgslide = require('../models/slide');
const { cloudinary } = require('../cdn/cloudinary');

var upload = multer({ dest: './public/uploads/' })
//get type
router.get('/', (req, res, next) => {
  Imgslide.find((err, dt) => {
    res.send(dt)
  })
})
router.get('/active', (req, res, next) => {
  Imgslide.find({ status: true }, (err, dt) => {
    res.send(dt)
  })
})
router.post('/status', (req, res, next) => {
  Imgslide.updateOne({ _id: req.body._id }, [
    {
      $set: {
        'status': req.body.status,
      }
    }
  ]).then(re => {
    res.status(200).json({ mess: 'Thành công', status: true })
  })
    .catch(er => {
      res.status(400).json({ mess: 'Thất bại', status: false })
    })
})
//create types
router.post('/set', async (req, res, next) => {
  // const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  //   let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
  //   orgName = orgName.trim().replace(/ /g, "-")
  //   const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
  //   // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
  //   const newFullPath = `${fullPathInServ}-${orgName}`;
  // fs.renameSync(fullPathInServ, newFullPath);
  try {


    const fileStr = req.body.base64Encode;
    const uploadFile = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_dienlanh'
    })
    if (req.body._id !== undefined) {
      Imgslide.updateOne({ _id: req.body._id }, [
        {
          $set: {
            'img': uploadFile.url,
          }
        }
      ])
        .then(re => {
          res.status(200).json({ mess: 'Thành công', status: true })
        })
        .catch(er => {
          res.status(400).json({ mess: 'Thất bại', status: false })
        })
    }
    else {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      Imgslide.create({
        img: uploadFile.url,
        status: true,
        created: now,
        createdlc: nowlc
      })

        .then(re => {
          res.status(200).json({ mess: 'Thành công', status: true })
        })
        .catch(er => {
          res.status(400).json({ mess: 'Thất bại', status: false })
        })
    }
  } catch (error) {
    console.error(error);
  }

});
//end types
module.exports = router;