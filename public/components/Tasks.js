import React from 'react';


const Tasks = ({ tasks, taskUpdate, taskDelete }) => {
    return(
        <div>
          <ul className='list-group'>
           { tasks.map((task, index) => {
            return(
              <li key={index} className='list-group-item'>
                  <span onClick={() => taskUpdate(task)}  style={{
                       textDecoration: task.done ? 'line-through' : 'none' }} >
                    {task.title}
                  </span>
                  <button className='btn btn-default btn-sm pull-right' style={{ marginBottom: '10px' }} onClick={() => taskDelete(task)}>
                   <span className='glyphicon glyphicon-trash' ></span>
                  </button>
                 </li>
                   )
            })}
          </ul>
        </div>
    )
}

export default Tasks;