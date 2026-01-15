import { Areas } from '../../redux/reducers/areas';
import { 
  FETCH_AREAS_REQUEST, 
  FETCH_AREAS_SUCCESS, 
  FETCH_AREAS_FAILURE 
} from '../../redux/ActionTypes';

describe('Area reducer', () => {

  it('should handle FETCH_AREAS_REQUEST', () => {
    const startAction = {
      type: FETCH_AREAS_REQUEST
    };
    const expectedState = { isLoading: true, errorMessage: null, areas: [] };
    // it's empty on purpose because it's just starting to fetch clients
    expect(Areas(undefined, startAction)).toEqual(expectedState);
  });

  it('should handle FETCH_AREAS_SUCCESS', () => {
    const areas = {
        'data':
        {
            'id': 1,
            'name' : "Basement",
        }
    };
    const action = { type: FETCH_AREAS_SUCCESS, payload: areas };
    const expectedState = { isLoading: false, errorMessage: null, areas: areas };
    expect(Areas({ isLoading: false, errorMessage: null, areas: [] }, action))
    .toEqual(expectedState);
  });

  it('should handle FETCH_AREAS_FAILURE', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_AREAS_FAILURE, payload: error };
    const expectedState = { isLoading: false, errorMessage: error };
    expect(Areas({ isLoading: false, errorMessage: error }, action)).toEqual(expectedState);
  });
});