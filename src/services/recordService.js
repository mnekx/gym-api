const Record = require('../database/Record');

const getRecordsForWorkout = (workoutID) => {
  try {
    const record = Record.getRecordsForWorkout(workoutID);
    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = { getRecordsForWorkout };
