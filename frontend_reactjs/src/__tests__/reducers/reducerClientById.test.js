import { ClientById } from '../../redux/reducers/clientById';
import { 
    FETCH_CLIENT_BY_ID_REQUEST, 
    FETCH_CLIENT_BY_ID_SUCCESS, 
    FETCH_CLIENT_BY_ID_FAILURE 
} from '../../redux/ActionTypes';

describe('ClientById reducer', () => {

  it('should handle FETCH_CLIENT_BY_ID_REQUEST', () => {
    const startAction = {
      type: FETCH_CLIENT_BY_ID_REQUEST
    };
    const expectedState = { isLoading: true, errorMessage: null, client: [] };
    // it's empty on purpose because it's just starting to fetch clients
    expect(ClientById(undefined, startAction)).toEqual(expectedState);
  });

  it('should handle FETCH_CLIENT_BY_ID_SUCCESS', () => {
    const client = {
        'data':
        {
            'id': 1,
            'identity_document' : "16450360",
            'first_last_name' : "MENESES",
            'second_last_name' : "BEJARANO",
            'first_name' : "SULLY",
            'other_names' : "ANDREA",
            'email' : "andrea@gmail.com",
            'country' : "co",
            'date_of_entry' : '2025-12-22',
            'status' : "Active",
            'type_of_identity_document_id' : 1,
            'area_id' : 1,
        }
    };
    const action = { type: FETCH_CLIENT_BY_ID_SUCCESS, payload: client };
    const expectedState = { isLoading: false, errorMessage: null, client: client };
    expect(ClientById({ isLoading: false, errorMessage: null, client: [] }, action))
    .toEqual(expectedState);
  });

  it('should handle FETCH_CLIENT_BY_ID_FAILURE', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_CLIENT_BY_ID_FAILURE, payload: error };
    const expectedState = { isLoading: false, errorMessage: error };
    expect(ClientById({ isLoading: false, errorMessage: error }, action)).toEqual(expectedState);
  });
});