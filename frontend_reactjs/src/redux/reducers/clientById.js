import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const ClientById = (state = { 
    isLoading: true,
    errorMessage: null,
    client:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CLIENT_BY_ID_REQUEST:
            return {...state, isLoading: true, errorMessage: null, client: []}

        case ActionTypes.FETCH_CLIENT_BY_ID_SUCCESS:
            return {...state, isLoading: false, errorMessage: null, client: action.payload};
            
        case ActionTypes.FETCH_CLIENT_BY_ID_FAILURE:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
            return state;
    }
};