import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { loginFailed : false, loginSuccess: false }
    }
    handleSubmit(e) {
        e.preventDefault();
        const password = this.passwordInput.value;
        const email = this.emailInput.value;
        const { setToken } = this.props
        axios('/token', {
            method: 'post',
            data: {
             password,
             email
            }
        })
        .then(json => {
            if (json.status !== 200) {
              return   this.setState({ loginFailed: true })
            }
            sessionStorage.setItem('token', json.data.token)
            setToken(json.data.token)
           return  this.setState({ loginSuccess: true })
        })
        .catch(err => this.setState({ loginFailed: true }))
    }
    
    render() {

        if(this.state.loginFailed) {
        return ( <Redirect to='/' /> )
        }
        if(this.state.loginSuccess) {
            return (<Redirect to='/user' />)
        }
        return (
            <div>
                <div className='navbar navbar-default' style={{ fontWeight: 'lighter', fontSize: '30' }}>
                    <Link to='/'> Home </Link>
                </div>
            <form  onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <label>Email</label>
               <input type='email' className = 'form-control' required ref={input => this.emailInput = input} />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='passsword' className='form-control' required ref={input => this.passwordInput = input} />
            </div>
               <input type='submit' className='btn btn-default' value= 'Submit' />
            </form>
            </div>
        )
    }
}

export default Login;