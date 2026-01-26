// actions.test.js
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { getNewEmail } from '../../redux/ActionCreators/clientActions';
import { 
  GET_NEW_EMAIL_REQUEST, 
  GET_NEW_EMAIL_SUCCESS, 
  GET_NEW_EMAIL_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async get new email actions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mocks after each test
  });

  it('creates GET_NEW_EMAIL_SUCCESS when fetching new email has been done', async () => {
    const mockNewEmail = {
        'new_email':'sully.meneses@example.com.co'
    };
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockNewEmail),
    });

    const expectedActions = [
      { type: GET_NEW_EMAIL_REQUEST },
      { type: GET_NEW_EMAIL_SUCCESS, payload: mockNewEmail }
    ];

    const store = mockStore({});

    const first_name = 'SULLY';
    const first_last_name = 'MENESES';
    const country = 'co';

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(getNewEmail(first_name, first_last_name, country));
    
    // Check that the dispatched actions match the expected sequence
    expect(store.getActions()).toEqual(expectedActions);
    // Optionally, check that fetch was called
    const url = baseUrl + 'clients/get-new-email?first_name=' + first_name
                    + '&first_last_name=' + first_last_name 
                    + '&country=' + country;
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('creates GET_NEW_EMAIL_FAILURE when fetching new email has been done with error', async () => {
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: false,
      status: 422
    });

    const expectedActions = [
      { type: GET_NEW_EMAIL_REQUEST },
      { type: GET_NEW_EMAIL_FAILURE, payload: 'Network response was not ok'}
    ];

    const store = mockStore({});

    const first_name = 'SULLY';
    const first_last_name = 'MENESES';
    const country = 'co';

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(getNewEmail(first_name, first_last_name, country));
    // Check that the dispatched actions match the expected sequence
    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    // Optionally, check that fetch was called
    const url = baseUrl + 'clients/get-new-email?first_name=' + first_name
                    + '&first_last_name=' + first_last_name 
                    + '&country=' + country;
    expect(fetch).toHaveBeenCalledWith(url);
  });
});