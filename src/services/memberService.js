const Member = require('../database/Member');
const { v4: uuid } = require('uuid');

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
  } catch (error) {
    throw error;
  }
};

const updateOneMember = (memberID) => {
  try {
    const updatedMember = Member.updateOneMember(memberID);
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
