
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { deleteClient } from '../../redux/ActionCreators/clientActions';
import { 
    DELETE_CLIENT_REQUEST, 
    DELETE_CLIENT_SUCCESS, 
    DELETE_CLIENT_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async deleteClient action', () => {
  let alertSpy; // 👈 define it here
  
  beforeEach(() => {
    // Spy on the window.alert method and provide an empty mock implementation
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    alertSpy.mockRestore();
  });

  it('dispatches DELETE_CLIENT_REQUEST and DELETE_CLIENT_SUCCESS when the PUT request is successful', async () => {
    
    const url = baseUrl + 'clients/1';

    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    const expectedActions = [
      { type: DELETE_CLIENT_REQUEST },
      { type: DELETE_CLIENT_SUCCESS },
    ];

    const store = mockStore({});

    // Dispatch the async action and wait for it to complete
    await store.dispatch(deleteClient("1"));

    // Assertions
    const actions = store.getActions();
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(actions).toEqual(expectedActions);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({
        method: 'DELETE'
    }));
  });

  it('dispatches UPDATE_CLIENT_REQUEST and DELETE_CLIENT_FAILURE when the PUT request fails', async () => {
    const errorMessage = 'Network response was not ok';

    const url = baseUrl + 'clients/1';
  
    // Mock a failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false, // Indicate failure
      status: 422,
      json: async () => ({ 
        errorMessage: errorMessage
       }), // Return an error body
    });

    const expectedActions = [
      { type: DELETE_CLIENT_REQUEST },
      { type: DELETE_CLIENT_FAILURE, payload: new Error('Network response was not ok')},
    ];

    const store = mockStore({});

    // Dispatch the async action and wait for it to complete
    await store.dispatch(deleteClient("1"));

    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({
        method: 'DELETE'
    }));
  });
});
