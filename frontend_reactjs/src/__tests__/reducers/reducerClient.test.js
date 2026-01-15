import { Clients } from '../../redux/reducers/clients';
import { 
    FETCH_CLIENTS_REQUEST, 
    FETCH_CLIENTS_SUCCESS, 
    FETCH_CLIENTS_FAILURE 
} from '../../redux/ActionTypes';

describe('Client reducer', () => {

  it('should handle FETCH_CLIENTS_REQUEST', () => {
    const startAction = {
      type: FETCH_CLIENTS_REQUEST
    };
    const expectedState = { isLoading: true, errorMessage: null, clients: [] };
    // it's empty on purpose because it's just starting to fetch clients
    expect(Clients(undefined, startAction)).toEqual(expectedState);
  });

  it('should handle FETCH_CLIENTS_SUCCESS', () => {
    const clients = {
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
    const action = { type: FETCH_CLIENTS_SUCCESS, payload: clients };
    const expectedState = { isLoading: false, errorMessage: null, clients: clients };
    expect(Clients({ isLoading: false, errorMessage: null, clients: [] }, action))
    .toEqual(expectedState);
  });

  it('should handle FETCH_CLIENTS_FAILURE', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_CLIENTS_FAILURE, payload: error };
    const expectedState = { isLoading: false, errorMessage: error };
    expect(Clients({ isLoading: false, errorMessage: error }, action)).toEqual(expectedState);
  });
});