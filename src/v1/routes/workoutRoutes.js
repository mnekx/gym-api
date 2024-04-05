const express = require('express');
const apicache = require('apicache');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const cache = apicache.middleware;

const recordController = require('../../controllers/recordController');

const workoutControllers = require('../../controllers/workoutController');

const router = express.Router();

router.get(
  '/',
  authenticate.authenticate,
  cache('2 minutes'),
  workoutControllers.getAllWorkouts
);

router.get('/:workoutID', workoutControllers.getOneWorkOut);
router.get('/:workoutID/records', recordController.getRecordsForWorkout);

router.post(
  '/',
  authenticate.authenticate,
  authorize.authorize,
  workoutControllers.createNewWorkout
);

router.delete('/:workoutID', workoutControllers.deleteOneWokout);

router.patch('/:workoutID', workoutControllers.updateOneWorkout);

module.exports = router;
