const findOneByEmail = (email) => {
  const DB = require('../database/db.json');

  const member = DB.members.find((member) => member.email === email);
  try {
    if (!member) {
      throw {
        status: 400,
        message: `Could not find member with email ${email}`,
      };
    }
    return member;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = { findOneByEmail };
