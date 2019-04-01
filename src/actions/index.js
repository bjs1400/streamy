import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => async (dispatch, getState) => { //the dispatch function gets returned to us by redux-thunk
    const { userId } = getState().auth; // 
    const response = await streams.post('/streams', { ...formValues, userId }); // we are making a post request to /streams 

    dispatch({ type: CREATE_STREAM, payload: response.data }) // axios returns a lot of info but we only care about data 
    // do some programmatic navigation to get the user back to the root route
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data })
};

export const editstream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};


