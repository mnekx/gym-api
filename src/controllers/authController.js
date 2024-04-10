const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { jwtSecret } = require('../../env-config');

const login = async (req, res) => {
  const { body } = req;

  try {
    const member = authService.findOneByEmail(body.email);
    const passwordMatch = await bcrypt.compare(body.password, member.password);
    if (!passwordMatch) {
      throw {
        status: 401,
        message: 'Username or password did not match!',
      };
    }

    const token = jwt.sign({ email: body.email }, jwtSecret, {
      expiresIn: '1h',
    });
    res.status(200).send({ status: 'OK', data: { token } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { message: error?.message || error } });
  }
};

module.exports = { login };
