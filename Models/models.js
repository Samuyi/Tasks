const mongoose = require('mongoose');
   
const Schema = mongoose.Schema;

const users = new mongoose.Schema({
    name: { required: [true, 'name is required'], type: String },
    password: { type: String, required: [true, 'password is required'] },
    email: { type: String, required: [true, 'email is reuqired'], unique: [true, 'email must be unique'] },
    tasks: [{type: Schema.Types.ObjectId, ref: 'Tasks'}]
})

const tasks = new mongoose.Schema({
    title: { required: true, type: String, unique: true },
    done: { type: Boolean, default: false },
    user: {type: Schema.Types.ObjectId, ref: 'Users', required: true },
    create_at: { type: Date, default: Date.now }
})

export const Tasks = mongoose.model('Tasks', tasks);
export const Users = mongoose.model('Users', users);