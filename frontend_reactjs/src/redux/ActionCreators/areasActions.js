import { 
  FETCH_AREAS_REQUEST, 
  FETCH_AREAS_FAILURE, 
  FETCH_AREAS_SUCCESS
} from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

// link catch error: https://stackoverflow.com/a/70697103
// https://stackoverflow.com/a/54950884
export const fetchAreas = () => async (dispatch) => {

  dispatch(fetchAreasRequest());

  try {
    const response = await fetch(baseUrl + 'areas');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const areas = await response.json();
    dispatch(fetchAreasSuccess(areas));
  } catch (error) {
    dispatch(fetchAreasFailed(error.message));
    console.log(error);
  }
};

/* Call action type from areas reducer */
export const fetchAreasRequest = () => ({
    type: FETCH_AREAS_REQUEST
});

/* Call action type from areas reducer */
export const fetchAreasSuccess = (typesOfIdentityDocument) => ({
    type: FETCH_AREAS_SUCCESS,
    payload: typesOfIdentityDocument
});

/* Call action type from areas reducer */
export const fetchAreasFailed = (error) => ({
    type: FETCH_AREAS_FAILURE,
    payload: error
});