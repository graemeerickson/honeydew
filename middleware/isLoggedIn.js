module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please log in to view this page.');
    res.redirect('/auth/login');
  }
  else {
    next();
  }
}