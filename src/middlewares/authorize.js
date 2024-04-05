const authorize = (req, res, next) => {
  res.status(200);
  next();
};

module.exports = { authorize };
