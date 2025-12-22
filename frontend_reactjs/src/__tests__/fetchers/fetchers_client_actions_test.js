// actions.test.js
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { fetchClients } from '../../redux/ActionCreators/clientActions';
import { FETCH_CLIENTS_REQUEST, FETCH_CLIENT_SUCCESS } from '../../redux/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async client actions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mocks after each test
  });

  it('creates FETCH_CLIENT_SUCCESS when fetching clients has been done', async () => {
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
      { type: FETCH_CLIENT_SUCCESS, payload: mockClients }
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchClients());
    
    // Check that the dispatched actions match the expected sequence
    expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify({expectedActions}));
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000?page=1&identity_document=');
  });
});