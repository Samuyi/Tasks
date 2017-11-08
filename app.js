import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';


import { User, Users, TaskId, Tasks, tokenRoute, index } from './API/routes';
import { init } from './API/auth';
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/taskDb', () => {
   console.log('mongodb is connected')
})
//Promise = global.Promise;

const app = express();


app.use(bodyParser.json());
app.use(init());
app.use(express.static('public'));

app.use('/', index);
app.use('/token', tokenRoute);
app.use('/users', Users);
app.use('/user', User);
app.use('/tasks', Tasks);
app.use('/tasks/:name', TaskId);

app.listen(3000, () => {
    console.log('api is now listening on port 3000');
});

module.exports = app;

