// actions.test.js
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { fetchTypesOfIdentityDocument } from '../../redux/ActionCreators/typeOfIdentityDocumentActions';
import { 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async typesOfIdentityDocument actions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mocks after each test
  });

  it('creates FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS when fetching clients has been done', async () => {
    const mockTypesOfIdentityDocument = {
        'data':
        {
            'id': 1,
            'code' : "123",
            'description' : "Cedula de ciudadania"
        }
    };
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTypesOfIdentityDocument),
    });

    const expectedActions = [
      { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST },
      { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS, payload: mockTypesOfIdentityDocument }
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchTypesOfIdentityDocument());
    
    // Check that the dispatched actions match the expected sequence
    expect(store.getActions()).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'types-of-identity-document');
  });

  it('creates FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE when fetching typesOfIdentityDocument has been done with error', async () => {
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: false,
      status: 422
    });

    const expectedActions = [
      { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST },
      { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE, payload: 'Network response was not ok'}
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchTypesOfIdentityDocument());
    // Check that the dispatched actions match the expected sequence
    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'types-of-identity-document');
  });
});