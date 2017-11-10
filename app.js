import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
const path = require('path');


import { User, Users, TaskId, Tasks, tokenRoute, index } from './Routes/routes';
import { init } from './Routes/auth';
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/taskDb', () => {
   console.log('mongodb is connected')
})
//Promise = global.Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(init());
app.use(express.static('public'));

app.use('/', index)
app.use('/token', tokenRoute);
app.use('/users', Users);
app.use('/user', User);
app.use('/tasks', Tasks);
app.use('/tasks/:name', TaskId);

app.listen(3000, () => {
    console.log('api is now listening on port 3000');
});

module.exports = app;



