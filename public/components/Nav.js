import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
           <Link to='/signup'>Signup</Link>
          </li>
          <li>
           <Link  to='/login'>Login</Link>
          </li>
        </ul>
        </div>
    )
}

export default Nav;