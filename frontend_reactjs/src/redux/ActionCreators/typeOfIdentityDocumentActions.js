import { 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS
} from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

// link catch error: https://stackoverflow.com/a/70697103
// https://stackoverflow.com/a/54950884
export const fetchTypesOfIdentityDocument = () => async (dispatch) => {

  dispatch(fetchTypesOfIdentityDocumentRequest());

  try {
    const response = await fetch(baseUrl + 'types-of-identity-document');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const typesOfIdentityDocument = await response.json();
    dispatch(fetchTypesOfIdentityDocumentSuccess(typesOfIdentityDocument));
  } catch (error) {
    dispatch(fetchTypesOfIdentityDocumentFailed(error.message));
    console.log(error);
  }
};

/* Call action type from typesOfIdentityDocument reducer */
export const fetchTypesOfIdentityDocumentRequest = () => ({
    type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST
});

/* Call action type from typesOfIdentityDocument reducer */
export const fetchTypesOfIdentityDocumentSuccess = (typesOfIdentityDocument) => ({
    type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS,
    payload: typesOfIdentityDocument
});

/* Call action type from typesOfIdentityDocument reducer */
export const fetchTypesOfIdentityDocumentFailed = (error) => ({
    type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE,
    payload: error
});