const express = require('express');
const { port } = require('../env-config');

const bodyParser = require('body-parser');
const v1WorkoutRouter = require('./v1/routes/workoutRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/app/v1/workouts', v1WorkoutRouter);

app.listen(PORT, () => {
  console.log('Server is listening on port ' + port);
});
