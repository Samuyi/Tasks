import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import User from '../containers/Userlink';
import Login from '../containers/LoginLink';
import Signup from './Signup';
import Home from './Home';
import Nav from './Nav';

class App extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const {  token } = this.props;
        const loggedIn = token ? true : false;
        return(
            <Router>
                <div className='container-fluid' style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>
              <Switch>
                <Route  exact  path='/' component={Home} />
                <Route  exact  path='/signup' component={Signup} />
                <Route  exact  path='/login' component={Login} />
                <Route  exact  path='/user' render={() => (loggedIn ? (
                <User /> ): <Redirect to='/'/>  )} />
              </Switch>
             </div>
            </Router>
        )
    }
}

export default App