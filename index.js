const express = require('express');
const app = express();
const cors = require('cors');

// MIDDLEWARE 
app.use(cors());
app.use(express.json()); 
// ROUTES
app.use('/users', require('./routes/users'));
app.use('/test-targets', require('./routes/testTargets'));
app.use('/roadmaps', require('./routes/roadmaps'));
app.use('/daily-schedules', require('./routes/dailySchedules'));
app.use('/checklists', require('./routes/checklists'));
app.use('/reminders', require('./routes/reminders'));
app.use('/study-streaks', require('./routes/studyStreaks'));

// SERVER
app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});