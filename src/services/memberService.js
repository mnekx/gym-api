const Member = require('../database/Member');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const getAllMembers = (filterParams) => {
  try {
    const allMembers = Member.getAllMembers(filterParams);
    return allMembers;
  } catch (error) {
    throw error;
  }
};

const getOneMember = (memberID) => {
  try {
    const returnedMember = Member.getOneMember(memberID);
    return returnedMember;
  } catch (error) {
    throw error;
  }
};

const updateOneMember = async (memberID, changes) => {
  try {
    if (changes.password) {
      const hashedPassword = await bcrypt.hash(changes.password, 10);
      changes = { ...changes, password: hashedPassword };
    }
    let updatedMember = Member.updateOneMember(memberID, changes);
    return updatedMember;
  } catch (error) {
    throw error;
  }
};

const deleteOneMember = (memberID) => {
  try {
    Member.deleteOnMember(memberID);
  } catch (error) {
    throw error;
  }
};

const createNewMember = (newMember) => {
  const memberToInsert = {
    ...newMember,
    id: uuid(),
  };
  try {
    const newlyCreatedMember = Member.createNewMember(memberToInsert);
    delete newlyCreatedMember.password;
    return newlyCreatedMember;
  } catch (error) {
    throw errror;
  }
};

module.exports = {
  getAllMembers,
  updateOneMember,
  createNewMember,
  deleteOneMember,
  getOneMember,
};
