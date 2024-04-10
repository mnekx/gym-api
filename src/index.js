const express = require('express');
const { port, jwtSecret} = require('../env-config');

const bodyParser = require('body-parser');
const v1WorkoutRouter = require('./v1/routes/workoutRoutes');
const v1MemberRouter = require('./v1/routes/memberRoutes');
const v1AuthRouter = require('./v1/routes/loginRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/app/v1/workouts', v1WorkoutRouter);
app.use('/app/v1/members', v1MemberRouter);
app.use('/app/v1/auth', v1AuthRouter);

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
