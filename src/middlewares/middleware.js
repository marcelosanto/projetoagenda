exports.middlewareGlobal = (req, res, next) => {
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
}

exports.csrfMiddlerare = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}