const DB = require('./db.json');

const getRecordsForWorkout = (workoutID) => {
  const record = DB.records.filter((record) => record.workout == workoutID);
  try {
    if (!record) {
      throw {
        status: 400,
        message: `Unable to find records for workout with ID ${workoutID}`,
      };
    }
    return record;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getRecordsForWorkout,
};
