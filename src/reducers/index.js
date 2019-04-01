import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';


export default combineReducers({
    auth: authReducer, // our authReducer returned an object, so auth represents an object 
    form: formReducer, //
    streams: streamReducer
});



