const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const port = 3000;

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// ROUTING IMPORTS
const taskRoute = require('./api/task/tasks-routes');
const authRoute = require('./api/auth/auth-routes');
const registerRoute = require('./api/register/register-routes');
const userRoute = require('./api/user/user-routes');

// ROUTING MIDDLEWARE
app.use('/api', taskRoute);
app.use('/api', authRoute);
app.use('/api', registerRoute);
app.use('/api', userRoute);

app.get('/', (req, res) => {
    res.send('MEVN Task Manager');
});

db.connectToDB();
app.listen(port, () => console.log(`listening at http://localhost:${port}`));