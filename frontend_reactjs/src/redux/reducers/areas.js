import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const Areas = (state = { 
    isLoading: true,
    errorMessage: null,
    areas:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_AREAS_REQUEST:
            return {...state, isLoading: true, errorMessage: null, areas: []}

        case ActionTypes.FETCH_AREAS_SUCCESS:
            return {...state, isLoading: false, errorMessage: null, areas: action.payload};
            
        case ActionTypes.FETCH_AREAS_FAILURE:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
            return state;
    }
};