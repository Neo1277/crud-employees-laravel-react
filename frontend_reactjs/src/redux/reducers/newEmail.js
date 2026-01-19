import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const NewEmail = (state = { 
    isLoading: true,
    errorMessage: null,
    newEmail:[]}, action) => {
    switch (action.type) {
        case ActionTypes.GET_NEW_EMAIL_REQUEST:
            return {...state, isLoading: true, errorMessage: null, newEmail: []}

        case ActionTypes.GET_NEW_EMAIL_SUCCESS:
            return {...state, isLoading: false, errorMessage: null, newEmail: action.payload};
            
        case ActionTypes.GET_NEW_EMAIL_FAILURE:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
            return state;
    }
};