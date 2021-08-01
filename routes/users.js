var express = require('express');
var router = express.Router();

var User = require('../models/user');
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);
/* GET users listing. */
router.post('/login', function (req, res, next) {
  User.findOne((err, dt) => {
    if (!dt) {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      User.create({
        email: 'admin',
        password: bcrypt.hashSync('1', 10),
        created: now,
        createdlc: nowlc
      }).then(re => {
        res.status(200).json({ mess: 'Khởi tạo tài khoản admin thành công' })
      })
    }
    else
      if (dt.email === req.body.email && bcrypt.compareSync(req.body.password, dt.password)) {
        var token = jwt.sign({ _id: dt._id }, process.env.SECRET_JWT);
        res.status(200).json({ mess: 'Đăng nhập thành công', status: true, token: token })
      } else {
        res.status(200).json({ mess: 'Đăng nhập thất bại', status: false })
      }
    // res.send(dt);
  })
  // User.deleteOne({ _id: '60f1af729129a931a05311f4' }) .then(re => {
  //   // res.status(200).json({ mess: 'Thành công', status: true })
  //   console.log(re);
  // }).catch(err=>{
  //   console.log(err);
  // })
});


router.post('/sendemail', function (req, res, next) {
  const { email, name, phone } = req.body;
  // const token = crypto.randomBytes(3).toString('hex');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SECRET_EMAIL_USERNAME,
      pass: process.env.SECRET_EMAIL_PASSWORD
    },

  });
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Admin điện lạnh',
    to: email,
    subject: 'Thư gửi xác nhận đăng ký thông tin sản phẩm mới từ dienlanh.com',
    text: 'Thông báo đăng ký thành công ' + email,
    html: '<div>Chào bạn : ' + name +
      '</div><p> Thông báo bạn đã đăng ký nhận thông tin mới thành công </b><ul><li>Email:'
      + email + '</li><li>Phone:' + phone +
      '</li></ul><div>Chúng tôi sẽ gửi thông tin những đợt giảm giá dịch vụ và sản phẩm nhằm chi ân đến bạn.</div>'
  }
  var adminOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Admin điện lạnh',
    to: process.env.SECRET_EMAIL_USERNAME,
    subject: 'Thư gửi thông báo nhận thông tin từ ' + email,
    text: 'Thông báo đăng ký thành công ' + email,
    html: '<p> Thông báo nhận thông thông tin từ :</b><ul><li>Name:' + name + '</li><li>Email:'
      + email + '</li><li>Phone:' + phone +
      '</li></ul>'
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      res.status(500).json({ mess: err });
    } else {
      transporter.sendMail(adminOptions, function (err, info) {
        if (err) {
          res.status(500).json({ mess: err });
        } else {
          res.status(500).json({ mess: info });
          // res.redirect('/');
        }
      });
    }
  });
})
module.exports = router;
