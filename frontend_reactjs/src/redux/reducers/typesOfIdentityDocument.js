import * as ActionTypes from '../ActionTypes';

/* Set reducer to handle redux state */
export const TypesOfIdentityDocument = (state = { 
    isLoading: true,
    errorMessage: null,
    typesOfIdentityDocument:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST:
            return {...state, isLoading: true, errorMessage: null, typesOfIdentityDocument: []}

        case ActionTypes.FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS:
            return {...state, isLoading: false, errorMessage: null, typesOfIdentityDocument: action.payload};
            
        case ActionTypes.FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
            return state;
    }
};