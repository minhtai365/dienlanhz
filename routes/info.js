
var multer = require('multer');
var express = require('express');
var router = express.Router();
const Info = require('../models/info');
const { cloudinary } = require('../cdn/cloudinary');
// var upload = multer({ dest: './public/uploads/' })
const jwt = require('jsonwebtoken');
const User = require('../models/user');
router.get('/', (req, res, next) => {
  const token = req.headers.token;
  Info.findOne((err, dt) => {
    if (err) {
      res.status(500).json({ mess: err, status: false })
    } else {
      try {
        var resJwt = jwt.verify(token, process.env.SECRET_JWT);
        if (resJwt) {
          User.findOne({ _id: resJwt._id }, (er, use) => {
            if (er) {
              return res.status(200).json({ mess: 'Vui lòng đăng nhập quyền admin !!!', status: true, data: dt, role: false })
            }
            else {
              res.status(200).json({ mess: 'Thành công', status: true, data: dt, role: true })
            }
          })
        }
      } catch (error) {
        return res.status(200).json({ mess: 'Vui lòng đăng nhập quyền admin !!!', status: true, data: dt, role: false })
      }
    }
  })
})
router.post('/set', async (req, res, next) => {
  const token = req.headers.token
  try {
    var resJwt = jwt.verify(token, process.env.SECRET_JWT);
    if (resJwt) {
      const { _id, name, email, address, phone, facebook, zalo, tiktok, youtube, introduce, paypolicy, shippolicy, warrantypolicy, logo } = req.body;
      try {
        const fileStr = logo;
        const uploadFile = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_dienlanh'
        })

        if (req.body._id !== undefined) {
          Info.updateOne({ _id: _id }, [
            {
              $set: {
                'name': name,
                'email': email,
                'address': address,
                'phone': phone,
                'facebook': facebook,
                'zalo': zalo,
                'tiktok': tiktok,
                'youtube': youtube,
                'logo': uploadFile.url,
                // 'gps': gps,
                'introduce': introduce,
                'paypolicy': paypolicy,
                'shippolicy': shippolicy,
                'warrantypolicy': warrantypolicy
              }
            }]
          )
            .then(re => {
              res.status(200).json({ mess: 'Thành công', status: true })
            })
            .catch(er => {
              res.status(400).json({ mess: 'Thất bại', status: false })
            })
        }
        else {
          var inf = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            facebook: facebook,
            zalo: zalo,
            tiktok: tiktok,
            youtube: youtube,
            logo: uploadFile.url,
            // gps: gps,
            introduce: introduce,
            paypolicy: paypolicy,
            shippolicy: shippolicy,
            warrantypolicy: warrantypolicy
          }
          Info.create(inf)
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
    }
  } catch (error) {
    return res.status(200).json({ mess: 'Vui lòng đăng nhập quyền admin !!!', status: true, role: false })
  }
})
module.exports = router;
