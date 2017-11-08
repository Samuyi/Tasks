import { users, user} from './Users';
import { tasks, taskId } from './Tasks';
import IndexApi from './index';
import token from './Token';

export const User = user;
export const Users = users;
export const Tasks = tasks;
export const TaskId = taskId;
export const tokenRoute = token;
export const index = IndexApi;