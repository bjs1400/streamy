import _ from 'lodash'; /* */
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }; // ???? 
        case FETCH_STREAM:
            //take all our key value pairs and add it to the new object
            return { ...state, [action.payload.id]: action.payload }; //REVIEW THIS! 
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default: return state;
    }
}

