const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  //set header in the response to 'auth-token' in auth.js, token will check if this property exists
  const token = req.header('auth-token');
  if(!token) res.status(401).send('Access Denied');

  try {
    //verifying with jwt method 'verify' using our token and secert token key as arguments
    //this verificatin method will return with our user id and that is what we are assigning verify to
    const verify = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verify;
    next();
  } catch(error) {
    res.status(400).send('Invalid Token')
  }
}