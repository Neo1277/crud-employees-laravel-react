
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { updateClient } from '../../redux/ActionCreators/clientActions';
import { 
    UPDATE_CLIENT_REQUEST, 
    UPDATE_CLIENT_SUCCESS, 
    UPDATE_CLIENT_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async updateClient action', () => {
  let alertSpy; // 👈 define it here
  
  beforeEach(() => {
    // Spy on the window.alert method and provide an empty mock implementation
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    alertSpy.mockRestore();
  });

  it('dispatches UPDATE_CLIENT_REQUEST and UPDATE_CLIENT_SUCCESS when the PUT request is successful', async () => {
    //const mockResponseData = { id: 1, title: 'New Post' };
    const mockClientData = {        
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
    };
    const url = baseUrl + 'clients/1';

    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    const expectedActions = [
      { type: UPDATE_CLIENT_REQUEST },
      { type: UPDATE_CLIENT_SUCCESS },
    ];

    const store = mockStore({});

    // Dispatch the async action and wait for it to complete
    await store.dispatch(updateClient(mockClientData, "1"));

    // Assertions
    const actions = store.getActions();
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(actions).toEqual(expectedActions);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(mockClientData),
    }));
  });

  it('dispatches UPDATE_CLIENT_REQUEST and UPDATE_CLIENT_FAILURE when the PUT request fails', async () => {
    const errorMessage = 'Network response was not ok';
    
    const mockClientData = {        
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
    };

    // Mock a failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false, // Indicate failure
      status: 422,
      json: async () => ({ 
        errorMessage: errorMessage,
        errors: {
          identity_document: "The identity document has already been taken."                 
        }
       }), // Return an error body
    });

    const expectedActions = [
      { type: UPDATE_CLIENT_REQUEST },
      { type: UPDATE_CLIENT_FAILURE, payload: new Error('Network response was not ok')},
    ];

    const store = mockStore({});

    // Dispatch the async action and wait for it to complete
    await store.dispatch(updateClient(mockClientData, "1"));

    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
