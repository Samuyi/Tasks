import axios from 'axios';

export const UPDATE_TASK = 'UPDATE_TASK';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECIEVE_TASKS = 'RECIEVE_TASKS';
export const SET_NAME = 'SET_NAME';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const DELETE_TASK = 'DELETE_TASK';


const token = sessionStorage.getItem('token');


export function sendTask(task) {
    return function(dispatch) {
        axios('/tasks', {
         method: 'post',
         headers: {
            'Authorization':  `Bearer ${token}`
         },
         data: {
         title: task.title
         }
        })
        .then(response => {
            if (response.status !== 200 ) return console.log(response.status)
            let res = response.data
            return dispatch(recieveTasks(res))
        }, err => {
          console.error(err);
        })
        .catch(err => console.error(err))
    }
}


export function setToken(token) {
    return {
        type: SET_TOKEN,
        token
    }
}

export function removeToken() {
    return {
        type: REMOVE_TOKEN
    }
}


export function recieveTasks (json) {
    return {
        type: RECIEVE_TASKS,
        task: json
    }
}

export function updateTask(task) {
    return {
        type: UPDATE_TASK,
        task
    }
}
export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        task
    }
}

export function setName(name) {
    return {
        type: SET_NAME,
        name
    }
}
export function taskUpdate(task) {
    let done = !task.done
    return function(dispatch) {
        axios(`/tasks/${task.title}`,{
            method: 'put',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                done: done
            }
        })
        .then(json => {
            if(json.status !== 200 ) {
                return console.error('there was an error')
            }
            return dispatch(updateTask(task))
        })
        .catch(err =>  console.error(err))
    }
}
export function taskDelete(task) {
    return function (dispatch) {
        axios(`/tasks/${task.title}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                title: task.title
            }
        })
      .then(json => {
                if (json.status !== 200) {
                    return console.error('there was an error')
                }
                return dispatch(deleteTask(task))
            })
    }
}
export function fetchTasks() {
    return function(dispatch) {
        axios('/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
             return response.data;
        }, err => console.error(err))
        .then( tasks => {
         tasks.map(task => dispatch(recieveTasks(task)))
        })
    }
}