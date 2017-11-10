import React from 'react';
import { Provider } from 'react-redux';
import storeFunc from '../store';
import App from './AppLink';

const store = storeFunc();


const Root = () => {
    return (
        <div>
            <Provider store={store}>
                <App />
            </Provider>
        </div>
    )
}

export default Root;