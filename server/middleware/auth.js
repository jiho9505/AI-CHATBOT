const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    
    if (Date.now() > user.tokenExp)
      return res.json({
        isAuth: false,
        error: true
      });
    
    user.updateTokenExp((err, user)=>{
      if (err) throw err;
    })

   
    req.token = token;
    req.user = user;
    
    next();
  });
};

module.exports = { auth };
