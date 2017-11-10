import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import reducer from './reducers';

const logger = createLogger();

const store = () => {
    return createStore(reducer, applyMiddleware(thunkMiddleware, logger));
}

export default store;