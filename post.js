const router = require('express').Router();
const verify = require('./verifyToken.js')


//adding the verify middleware for provacy, so that posts cannot be read without first logging in
//and showing off that jwt!
router.get('/', verify, (req, res) => {
  res.send(req.user)
  //find user with id by:
  User.findOne({_id: req.user})
})

module.exports = router;