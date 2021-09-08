import {createStore, applyMiddleware} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux thunk'
import rootReducer from './reducer'

const initialState = {};


const middleware = [thunk];

// const store =  createStore(
    
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
//     );
const store = createStore(
    rootReducer, /* preloadedState, */
 +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
 


    export default store;