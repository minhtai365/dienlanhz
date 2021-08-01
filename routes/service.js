var express = require('express');
var router = express.Router();
var Service = require('../models/service');

//get catelogy
router.get('/all', (req, res, next) => {
  Service.find((err, dt) => {
    res.send(dt)
  })
})
router.get('/:id', (req, res) => {
  Service.find({ _id: req.params.id }, (err, dt) => {
    if (dt && dt.length >= 0) {
      if (dt[0].post) {
        res.status(200).json({ mess: 'Thành công', status: true, data: dt[0].post })
      }
      else {
        res.status(500).json({ mess: 'Thất bại', status: false })
      }
    }
  })
})
//create catelogy
router.post('/set', (req, res, next) => {
  if (req.body._id !== undefined) {
    Service.updateOne({ _id: req.body._id }, [{
      $set: {
        "name": req.body.name,
        "post": req.body.post,
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
    Service.create({
      name: req.body.name,
      post: req.body.post,
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