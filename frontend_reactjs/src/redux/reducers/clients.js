import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const Clients = (state = { 
    isLoading: true,
    errorMessage: null,
    clients:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CLIENTS_REQUEST:
            return {...state, isLoading: true, errorMessage: null, clients: []}

        case ActionTypes.FETCH_CLIENTS_SUCCESS:
            return {...state, isLoading: false, errorMessage: null, clients: action.payload};
            
        case ActionTypes.FETCH_CLIENTS_FAILURE:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
            return state;
    }
};