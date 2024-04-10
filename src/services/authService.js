const Auth = require('../database/Auth');

const findOneByEmail = (email) => {
  try {
    const found = Auth.findOneByEmail(email);
    return found;
  } catch (error) {
    throw error;
  }
};

module.exports = { findOneByEmail };
