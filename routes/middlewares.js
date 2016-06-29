export function ensureAuthorized (req, res, next) {
  // next()
  if (req.isAuthenticated() && req.user.roles.length) {
    next()
  } else {
    res.redirect('/login')
  }
}
