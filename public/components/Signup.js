import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'

class Signup extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { success: false };
    }
    handleSubmit(e) {
        e.preventDefault();
        const name = this.nameInput.value;
        const password = this.passwordInput.value;
        const email = this.emailInput.value;
        const data = { name, password, email }
      //   console.log(data)
        
        axios('/users', {
            method: 'post',
            data
        })
        .then(response => {
               return  this.setState({ success: true})
        }) 
        .catch(err => console.log(err))

    }
    
    render() {
        if (this.state.success) {
            return( <Redirect to = '/login' /> )
        }
        return (
            <div>
                <div className='navbar navbar-default' style={{ fontWeight: 'lighter', fontSize: '30' }}>
                    <Link to='/'> Home </Link>
                </div>
            <form  onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label>Name:</label>
               <input type='text' className='form-control' required ref={input => this.nameInput = input} />
            </div> 
            <div className='form-group'>
               <label>Password:</label>
               <input type='passsword' className='form-control' required ref={input => this.passwordInput = input} />
            </div>
            <div className = 'form-group'>
               <label>Email:</label>
               <input type='email' className='form-control' required ref={input => this.emailInput = input} />
            </div>
               <input type='submit' className='btn btn-default'  value= 'Submit' />
            </form>
            </div>
        )
    }
}

export default Signup;