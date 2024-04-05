const authenticate = (req, res, next) => {
  res.status(200);
  console.log('THIS REQUEST IS AUTHENTICATED!');
  next();
};

module.exports = { authenticate };
