import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Task from './Tasks';
import axios from 'axios';

class User extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signout = this.signout.bind(this);
        this.sendTask = props.sendTask;
        this.fetchTask = props.fetchTask;
        this.state = { name: '', signedOut: false}
    }
     componentWillMount() {
        const token = sessionStorage.getItem('token')
        console.log(token)
        axios({
            url: 'http://localhost:3000/user',
            method: 'get',
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
          let name = res.data.name
          this.setState({ name: name })
          this.fetchTask();
        }).catch(err => console.error(err))
      
    }
    handleSubmit (e) {
        e.preventDefault();
        const task = {};
        task.title= this.taskInput.value;
        this.sendTask(task);
        this.taskInput.value = '';
    }

    signout() {
      sessionStorage.removeItem('token');
      this.setState({ signedOut: true })
    }
    
    render() {
        if (this.state.signedOut) {
        return ( <Redirect to = '/' /> )
        }
        const { tasks, taskUpdate, deleteTask, name  } = this.props

        return (
            <div>
             <div className='navbar navbar-default' style={{ fontWeight: 'lighter', fontSize: '30' }}>
                <ul className='nav navbar-nav'>
                <li><Link to = '/'> Home </Link></li>
                <li onClick={this.signout}><a href='#'>Signout </a></li>
                </ul>
              </div>
              <div className='page-header'>
              <h2>Welcome {this.state.name} </h2>
              </div>
              <div>
              <form  onSubmit={this.handleSubmit}>
              <div className='form-group'>
              <label>Task: </label>
                <input type='text' className='form-control' required  ref={input => this.taskInput = input }/>
              </div>
              <div className='form-group'>  
                <input type='submit' className='btn btn-primary' value='Create Task' />
            </div>
              </form>
              </div>
              { tasks.length > 0 && <Task taskUpdate = {task => taskUpdate(task) } 
              taskDelete = { task => deleteTask (task) } tasks = {tasks} />}
              
            </div>
        )
    }
}

export default User