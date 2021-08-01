var express = require('express');
var router = express.Router();
var Catelogies = require('../models/catelogie');
const Product = require('../models/product');
//get catelogy
router.get('/', (req, res, next) => {
  // Catelogies.find((err, dt) => {
  //   res.send(dt)
  // })
  Catelogies.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "catelogyid",
        as: "cate"
      },
    },
    {
      $project: {
        "name": "$name",
        "createdlc": "$createdlc",
        count: { $size: "$cate" }
      }
    },
  ]).then(re => {
    res.status(200).send(re);
  })
  // Product.aggregate([
  //   {
  //     $group: {
  //       _id: '$catelogyid',
  //       count: { $sum: 1 }
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: "catelogies",
  //       localField: "_id",
  //       foreignField: "_id",
  //       as: "cate"
  //     },
  //   },
  //   {
  //     $project: {
  //       "name": "$cate.name",
  //       "createdlc": "$cate.createdlc",
  //       //  {
  //       //   $slice: ["$data", 0, 1],
  //       // }
  //       count: "$count"
  //     }
  //   },
  //   {
  //     $unwind: "$name"
  //   },
  //   {
  //     $unwind: "$createdlc"
  //   }
  // ]).then(re => {
  //   res.status(200).send(re);
  // })
})
//create catelogy
router.post('/set', (req, res, next) => {
  if (req.body._id !== undefined) {
    Catelogies.updateOne({ _id: req.body._id }, [{
      $set: {
        "name": req.body.name
      }
    }])
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
    Catelogies.create({
      name: req.body.name,
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
})

module.exports = router;