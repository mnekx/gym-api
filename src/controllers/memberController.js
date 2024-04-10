const membersService = require('../services/memberService');
const bcrypt = require('bcrypt');

const getAllMembers = (req, res) => {
  const { gender } = req.query;
  try {
    const allMembers = membersService.getAllMembers({ gender });
    res.send({ status: 'OK', data: { allMembers } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: error?.message || error });
  }
};

const getOneMember = (req, res) => {
  const {
    params: { memberID },
  } = req;
  try {
    if (!memberID) {
      throw {
        status: 400,
        message: 'Parameter memberID can not be empty!',
      };
    }
    const returnedMember = membersService.getOneMember(memberID);
    res.send({ status: 'OK', data: { returnedMember } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: error?.message || error });
  }
};

const updateOneMember = async (req, res) => {
  const {
    params: { memberID },
    body,
  } = req;
  if (!memberID) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter workoutID can not be empty!' },
    });
  }

  try {
    const updatedMember = await membersService.updateOneMember(memberID, body);
    console.log(updatedMember);
    res.send({ status: 'OK', data: updatedMember });
    return;
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: error?.message || error });
  }
};

const deleteOneMember = (req, res) => {
  const {
    params: { memberID },
  } = req;

  try {
    if (!memberID) {
      throw {
        status: 400,
        message: 'Parameter memberID can not be empty!',
      };
    }
    membersService.deleteOneMember(memberID);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: error?.message || error });
  }
};

const createNewMember = async (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.gender ||
    !body.dataOfBirth ||
    !body.email ||
    !body.password
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        message:
          'One or more of the following keys are missing: name, gender, dateOfBirth, email, password',
      },
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newMember = {
    name: body.name,
    email: body.email,
    password: hashedPassword,
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
  };

  try {
    const createdMember = membersService.createNewMember(newMember);
    res.status(201).send({ status: 'OK', data: { createdMember } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { message: error?.message || error } });
  }
};
module.exports = {
  getAllMembers,
  updateOneMember,
  getOneMember,
  deleteOneMember,
  createNewMember,
};
