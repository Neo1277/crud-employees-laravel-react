import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const Clients = (state = { 
    isLoading: true,
    errMess: null,
    clients:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CLIENTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, clients: action.payload};

        case ActionTypes.FETCH_CLIENTS_REQUEST:
            return {...state, isLoading: true, errMess: null, clients: []}

        case ActionTypes.FETCH_CLIENTS_FAILURE:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};