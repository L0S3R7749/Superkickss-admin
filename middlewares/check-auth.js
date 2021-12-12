const checkAuth = {
  
  isAuthenticated: (req, res, next) => {
    /* Continue if authenticated, else go to login  */
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },
  // Go to home if authenticated, for auth routes only
  isNotAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  },

  checkAuthentication: (req, res, next) => {
    if (req.isAuthenticated())
      next();
    else
      res.redirect('/auth/login');
  }
}

module.exports = checkAuth;