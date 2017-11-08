import router from './config.api';
import { authenticate } from './auth';
import { Users, Tasks } from '../Models/models';
import bcrypt from 'bcrypt';
const _ = require('lodash');

const users = router;
const user = router;

user.route('/user')
.all(authenticate())
 /**
  * @api {get} /user Return the authenticated user's data
  * @apiGroup User
  * @apiHeader {String} Authorization Token of authenticated user
  * @apiHeaderExample {json} Header 
  * {"Authorization": "Bearer xyz.abc.123.hfg"} 
  * @apiSuccess {Number} id User id
  * @apiSuccess {String} name User name
  * @apiSuccess {String} email User email
  * @apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   * {
   *  "id": 1,
   *   "name": "john connor",
   *   "email": "john@connor.net"
   * }
   * @apiErrorExample {json} Find error
   *  HTTP/1.1 412 Precondition Failed
  */
.get((req, res) => {
    
    const email = req.user.email;
    Users.findOne({email: email})
    .populate('tasks')
        .then(result => {
            if (result) {
                return res.json(result);
            } else {
                return res.status(404);
            }
        })
        .catch(() => {
            return res.status(401).json({msg: 'user not found'});
        })  
})
/**
 * @api {delete} /user Delete an authenticated user
 * @apiGroup User
 * @apiHeader {String} Authorization Token of authenticated user
 * @apiHeaderExample {json} Header
 * { "Authorization": "Bearer xyz.abc.123.hgf"}
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 * HTTP/1.1 412 Precondition Failed
 */
.delete((req, res) => {
    const email = req.user.email;
    Users.deleteOne({email: email} )
        .then(result => {
            return res.status(204);
        })
        .catch(() => {
            return res.status(401).json({msg:'User does not exist'});
        }); 
})
/**
 * @api {post} /user Register a new user
 * @apiGroup User 
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *  {
 *  "name": "John Connor",
 *  "email": "John@connor.skynet",
 * "password": "12345"
 * }
 * @apiSucces {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email User email
 * @apiSuccess {String} password User encrypted password
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 * {
 *  "id": 1,
 * "name": "John Connor",
 * "email": "johnconnor@skynet",
 * "created_at": "2016-02-10T15:29:11.700Z"
 * }
 */
users.route('/users')
  .post((req, res) => {
      console.log(req.body)
      if(!req.body.email && !req.body.name && !req.body.password) {
            return req.status(400).json({err: 'email, password and name are required'})
      }
      if(!_.isString(req.body.email) && !_.isString(req.body.password) && !_.isString(req.body.name)) {
          return res.status(400).json({err: 'email and password must be strings'})
      }
      
      const salt = bcrypt.genSaltSync();
      const password = bcrypt.hashSync(req.body.password, salt);
      req.body.password = password;

      Users.create(req.body).then(result => {
          return res.json(result)
      }).catch(err => {
          return res.status(500).send('there was an error try again')
      })
                                     
  });


module.exports = {
    users, 
    user
}