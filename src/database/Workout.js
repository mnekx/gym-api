const DB = require('./db.json');
const { saveToDB } = require('./utils');

const getAllWorkouts = (filterParams) => {
  let workouts = DB.workouts;
  try {
    if (filterParams.mode) {
      workouts = DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return workouts;
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  try {
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name ${newWorkout.name} already exists!`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDB(DB);
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getOneWorkOut = (workoutID) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutID);
  try {
    if (!workout) {
      throw {
        status: 400,
        message: `Can not find workout with ID ${workoutID}`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.meesage || error };
  }
};

const updateOneWorkout = (workoutID, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutID
  );
  try {
    if (indexForUpdate == -1) {
      throw {
        status: 400,
        message: `Could not find workout with ID ${workoutID}`,
      };
    }

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', { timezone: 'UTC' }),
    };

    DB.workouts[indexForUpdate] = updatedWorkout;

    saveToDB(DB);

    return updatedWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteOneWorkout = (workoutID) => {
  const indexForDeletion = DB.workouts.findIndex(
    (workout) => workout.id === workoutID
  );

  try {
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Could not find workout with ID ${workoutID}`,
      };
    }

    DB.workouts.splice(indexForDeletion, 1);

    saveToDB(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkOut,
  updateOneWorkout,
  deleteOneWorkout,
};
