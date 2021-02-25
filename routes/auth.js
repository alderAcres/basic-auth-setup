const router = require('express').Router();
const User = require('./model/User.js');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
  //VLAIDATE DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in DB
const emailExist = await User.findOne({email: req.body.email})
if(emailExist) return res.status(400).send('Email already exists in database')

  //Hash the password: Generate salt
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save();
    res.send({user: user._id})
  } catch(err) {
    res.status(400).send(err)
  }
})

//Login
router.post('/login', async (req, res) => {
  //login validation
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
//Checking if the email exists
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).send("Email doesn't exists in database")
  //PASSWORD IS CORRECT?
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) res.status(400).send('Invalid password')
//create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router;