import { combineReducers } from 'redux';
import { UPDATE_TASK, RECIEVE_TASKS, SET_TOKEN, REMOVE_TOKEN, DELETE_TASK } from './actions';


function Tasks (state=[], action) {
  switch(action.type) {
      case RECIEVE_TASKS: 
       return [...state, {
         title: action.task.title,
         done: action.task.done
        }] 
      case UPDATE_TASK: 
     var title = action.task.title;
      var done = action.task.done;
       return state.map((task, index) =>
          (task.title === title) ? {...task, done: !done} : task
     )
     case DELETE_TASK:
       var title = action.task.title
          return state = state.filter((task, index) =>  task.title !== title )
     default:
        return state;
  }
}


function Token(state = null, action) {
    if (action.type == SET_TOKEN ) {
        return state = action.token
    } else if (action.type == REMOVE_TOKEN) {
        return state = '';
    } else {
        return state
    }
}

const reducer = combineReducers({
    Tasks,
    Token
})

export default reducer;