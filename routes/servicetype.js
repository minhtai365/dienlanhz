var express = require('express');
var router = express.Router();
var ServiceTypes = require('../models/servicetype');

//get catelogy
router.get('/', (req, res, next) => {
    ServiceTypes.find((err, dt) => {
      res.send(dt)
    })
  })
  //create catelogy
  router.post('/set', (req, res, next) => {
    if (req.body._id !== undefined) {
      ServiceTypes.updateOne({ _id: req.body._id }, [{
        $set: {
          "name": req.body.name
        }
      }])
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
    else {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      ServiceTypes.create({
        name: req.body.name,
        created: now,
        createdlc: nowlc
      })
      .then(re=>{       
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
  })
  
module.exports = router;