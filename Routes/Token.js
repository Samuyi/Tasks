import jwt from 'jwt-simple';
import { Users } from '../Models/models';
import router from './config.api';
import bcrypt from 'bcrypt';


/**
 * @api {post} /token Authentication Token
 * @apiGroup Credentials
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 * {
 *    "email": "john@connor.net",
 *    "password": "12344"
 * }
 * @apiSuccess {String} token  Token of authenticated user
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 * { "token": "xyz.abc.123.hgf"}
 * @apiErrorExample {json} Authentication error
 *  HTTP/1.1 401 Unauthorized
 */



const token = router;

token.route('/token')
.post((req, res) => {

    //console.log(req.body)
    if(req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({email: email})
        .then(user => {
          bcrypt.compare(password, user.password).then ((result) =>  {
             if (result) {
                 const payload = { email: user.email };
                 return res.json({
                     token: jwt.encode(payload, '$Samuyi902210Pandorra£90')
                 });
             }
             else {
                 return res.status(401).json({ err: 'incorrect password'})
             }
           })
        })
        .catch((err) => {
                return res.status(401).json({ err: 'user not found'})
       });
    } else {
        return res.status(401).json({err: 'email and password required'})
    }
})


export default token;