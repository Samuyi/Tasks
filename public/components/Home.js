import React, { Component } from 'react';
import Nav from './Nav';


class Home extends Component {
    
    render() {
        return (
            <div>
                <div className='navbar navbar-default' style={{ color: 'rgba(12, 60, 204, 0.3)', fontWeight: 'lighter', fontSize: '30' }}>
               <Nav />
             </div>
                <div className='jumbotron' style={{ color: 'rgba(12, 60, 204, 0.3)', fontFamily: 'monospace' }}>
              <div className='page-header'>
              <h1>Welcome To The Tasks App</h1>
              </div>
              <p>Signup or login to create and view tasks. </p>
              </div>
            </div>
        )
    }
}



export default Home;