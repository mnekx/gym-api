const workoutService = require('../services/workoutService');

const getAllWorkouts = (reqHandler, resHandler) => {
  const { mode } = reqHandler.query;
  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    resHandler.send({ status: 'OK', data: allWorkouts });
  } catch (error) {
    resHandler
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const getOneWorkOut = (reqHandler, resHandler) => {
  const {
    params: { workoutID },
  } = reqHandler;
  if (!workoutID) {
    resHandler.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :workoutID can not be empty!' },
    });
    return;
  }
  try {
    const oneWorkout = workoutService.getOneWorkOut();
    resHandler.send({ status: 'OK', data: oneWorkout });
  } catch (error) {
    resHandler.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

const createNewWorkout = (reqHandler, resHandler) => {
  const { body } = reqHandler;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    resHandler.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = workoutService.createOneWorkout(newWorkout);
    resHandler.status(201).send({ status: 'OK', data: createdWorkout });
  } catch (error) {
    resHandler
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (reqHandler, resHandler) => {
  const {
    params: { workoutID },
    body,
  } = reqHandler;
  if (!workoutID) {
    reqHandler.status(400).send({
      status: 'FAILED',
      data: { error: `Parameter :workoutID can not be empty!` },
    });
    return;
  }

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutID, body);
    resHandler.send({ status: 'OK', data: updatedWorkout });
    return;
  } catch (error) {
    resHandler
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: error?.message || error });
  }
};

const deleteOneWokout = (reqHandler, resHandler) => {
  const {
    params: { workoutID },
  } = reqHandler;

  if (!workoutID) {
    resHandler.status(400).send({
      status: 'FAILED',
      message: `Parameter :workoutID can not be empty!`,
    });
    return;
  }

  try {
    const deletedWorkout = workoutService.deleteOneWokout(workoutID);
    resHandler.status(204).send({ status: 'OK' });
  } catch (error) {
    resHandler.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkOut,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWokout,
};
