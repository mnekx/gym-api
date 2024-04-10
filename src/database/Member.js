const DB = require('./db.json');
const { saveToDB } = require('./utils');

const getAllMembers = (filterParams) => {
  let members = DB.members;
  if (filterParams.gender) {
    try {
      members = members.filter((member) => {
        member.gender === filterParams.gender;
      });
    } catch (error) {
      throw {
        status: 500,
        message: error,
      };
    }
  }

  return members.map((member) => {
    delete member.password;
    return member;
  });
};

const getOneMember = (memberID) => {
  const member = DB.members.find((member) => member.id === memberID);
  try {
    if (!member) {
      throw {
        status: 400,
        message: `Could not find member with ID ${memberID}`,
      };
    }
    delete member.password;
    return member;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateOneMember = (memberID, changes) => {
  const indexForUpdate = DB.members.findIndex(
    (member) => member.id === memberID
  );
  try {
    if (indexForUpdate == -1) {
      throw {
        status: 400,
        message: `Could not find member with ID ${memberID}`,
      };
    }
    const updatedMember = {
      ...DB.members[indexForUpdate],
      ...changes,
    };

    DB.members[indexForUpdate] = updatedMember;
    saveToDB(DB);
    delete updatedMember.password;
    return updatedMember;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOnMember = (memberID) => {
  const indexForDeletion = DB.members.findIndex(
    (member) => member.id === memberID
  );

  try {
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Could not find member with ID ${memberID}`,
      };
    }

    DB.members.splice(indexForDeletion, 1);
    saveToDB(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createNewMember = (newMember) => {
  const isAlreadyAdded =
    DB.members.findIndex((member) => member.email === newMember.email) > -1;

  try {
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Member with email address ${newMember.email} already ixists!`,
      };
    }

    DB.members.push(newMember);
    saveToDB(DB);
    return newMember;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  updateOneMember,
  deleteOnMember,
  createNewMember,
};
