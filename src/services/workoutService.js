const Workouts = require('../database/Workout');

const { v4: uuid } = require('uuid');

const getAllWorkouts = (filterParams) => {
  try {
    return Workouts.getAllWorkouts(filterParams);
  } catch (error) {
    throw error;
  }
};

const getOneWorkOut = (workoutID) => {
  try {
    const returnedWorkout = Workouts.getOneWorkOut(workoutID);
    return returnedWorkout;
  } catch (error) {
    throw error;
  }
};

const createOneWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  };
  try {
    const createdWorkout = Workouts.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWokout = (workoutID) => {
  try {
    Workouts.deleteOneWokout(workoutID);
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutID, changes) => {
  try {
    const updatedWorkout = Workouts.updateOneWorkout(workoutID, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkOut,
  createOneWorkout,
  deleteOneWokout,
  updateOneWorkout,
};
