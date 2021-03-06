import router from './config.api';
import { authenticate } from './auth';
import { Users, Tasks } from '../Models/models';
const _ = require('lodash');

const tasks = router;
const taskId = router;

tasks.route('/tasks')
.all(authenticate())
.get((req, res) => {  
  
    Tasks.find()
     .populate('user')
     .then(result => {
         return res.json(result);
     })
     .catch((err) => {
         return res.status(401).json({err: 'there was an error'})
     });
})
.post((req, res) => {
    console.log(req.body)
    if (!_.isString(req.body.title)) {
        return res.status(400).json({msg: 'task must be a string'});
    }
    const email = req.user.email
    Users.findOne({ email: email })
    .then(user => {
        console.log(user)
        Tasks.create({
            title: req.body.title,
            done: req.body.done,
            user: user._id
    }, (err, task) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        return res.json(task)
    })
    })
    .catch(err => {
        return res.status(500).send(err)
    })
    
   
     
   
})
taskId.route('/tasks/:name')
  .all(authenticate())
  .get((req, res) => {
      let name = req.params.name
      if (!_.isString(name)) return res.status(400).send('wrong request parameter');
       Users.findOne({email: req.user.email})
          .then(result => {
              Tasks.find({ user: result._id, title: name})
                   .then(task => {
                       return res.json(task);
                   }).catch(err => {
                       return res.status(404).send('task not found')
                   })
          }). catch(err => res.status(500).send('there was an error'))

})
  .delete((req, res) => {
      let name = req.params.name
      let email = req.user.email
      let log = { name, email: email}
      console.log(name)
      if (!_.isString(name)) return res.status(400).send('wrong request parameter');
      Users.findOne({ email: email })
          .then(result => {
              Tasks.deleteOne({ user: result._id, title: name })
                  .then(task => {
                      return res.status(200).send('task deleted');
                  }).catch(err => {
                      return res.status(404).send('task not found')
                  })
          }).catch(err => res.status(500).send('there was an error'))
  })
  .put((req, res) => {
      let name = req.params.name
      let done = req.body.done
      console.log(done)
      if (!_.isString(name)) return res.status(400).send('wrong request parameter');
      if (!req.body && !req.body.title && !req.body.done) {
          return res.status(400).json({msg: 'please supply title and done parameter'})
      }
      if (!_.isBoolean(req.body.done) && !_.isString(req.body.title)) {
          return res.status(400).json({msg: 'done parameter must be boolean'})
      }
      Users.findOne({ email: req.user.email })
          .then(result => {
              let id = result._id
              Tasks.update({ user: id, title: name }, { done: done}, (err, result) => {
                  if(err) {
                      return res.send(err)
                  }
                  return res.json(result);
              })
          }).catch(err => res.status(500).send('there was an error'))

  });

module.exports ={
    tasks,
    taskId
}