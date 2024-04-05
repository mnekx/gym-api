const recordService = require('../services/recordService');

const getRecordsForWorkout = (req, res) => {
  const {
    params: { workoutID },
  } = req;

  if (!workoutID) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter workoutID can not be empty!' },
    });
    return;
  }

  try {
    const records = recordService.getRecordsForWorkout(workoutID);
    res.send({ status: 'OK', data: { records } });
  } catch (error) {
    res.send({ status: error?.status, data: { error: error?.message } });
  }
};

module.exports = { getRecordsForWorkout };
