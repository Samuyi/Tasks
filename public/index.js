import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import 'babel-polyfill';

render(
    <Root />,
    document.getElementById('app')
)