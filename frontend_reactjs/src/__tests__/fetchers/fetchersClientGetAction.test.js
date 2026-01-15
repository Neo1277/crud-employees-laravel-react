// actions.test.js
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { fetchClients } from '../../redux/ActionCreators/clientActions';
import { 
  FETCH_CLIENTS_REQUEST, 
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async client actions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mocks after each test
  });

  it('creates FETCH_CLIENTS_SUCCESS when fetching clients has been done', async () => {
    const mockClients = {
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
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClients),
    });

    const expectedActions = [
      { type: FETCH_CLIENTS_REQUEST },
      { type: FETCH_CLIENTS_SUCCESS, payload: mockClients }
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchClients());
    
    // Check that the dispatched actions match the expected sequence
    expect(store.getActions()).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'clients?page=1&identity_document=');
  });

  it('creates FETCH_CLIENTS_FAILURE when fetching clients has been done with error', async () => {
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: false,
      status: 422
    });

    const expectedActions = [
      { type: FETCH_CLIENTS_REQUEST },
      { type: FETCH_CLIENTS_FAILURE, payload: 'Network response was not ok'}
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchClients());
    // Check that the dispatched actions match the expected sequence
    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'clients?page=1&identity_document=');
  });
});