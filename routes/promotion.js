var express = require('express');
var router = express.Router();
var Promotion = require('../models/promotion');

//get catelogy
router.get('/', (req, res, next) => {
  Promotion.find((err, dt) => {
    res.send(dt)
  })
})
//create catelogy
router.post('/set', (req, res, next) => {
  if (req.body._id !== undefined) {
    Promotion.updateOne({ _id: req.body._id }, [{
      $set: {
        "name": req.body.name,
        "content": req.body.content,
        "status": req.body.status
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
    Promotion.create({
      name: req.body.name,
      content: req.body.content,
      status: false,
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