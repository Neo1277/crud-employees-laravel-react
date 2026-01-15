// actions.test.js
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { fetchAreas } from '../../redux/ActionCreators/areasActions';
import { 
  FETCH_AREAS_REQUEST, 
  FETCH_AREAS_SUCCESS, 
  FETCH_AREAS_FAILURE 
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the global fetch function
global.fetch = jest.fn();

describe('async areas actions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mocks after each test
  });

  it('creates FETCH_AREAS_SUCCESS when fetching areas has been done', async () => {
    const mockAreas = {
        'data':
        {
            'id': 1,
            'name' : "Basement"
        }
    };
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockAreas),
    });

    const expectedActions = [
      { type: FETCH_AREAS_REQUEST },
      { type: FETCH_AREAS_SUCCESS, payload: mockAreas }
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchAreas());
    
    // Check that the dispatched actions match the expected sequence
    expect(store.getActions()).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'areas');
  });

  it('creates FETCH_AREAS_FAILURE when fetching areas has been done with error', async () => {
    
    // Configure the mock fetch response
    fetch.mockResolvedValue({
      ok: false,
      status: 422
    });

    const expectedActions = [
      { type: FETCH_AREAS_REQUEST },
      { type: FETCH_AREAS_FAILURE, payload: 'Network response was not ok'}
    ];

    const store = mockStore({});

    // Use async/await to ensure the promise resolves before assertions
    await store.dispatch(fetchAreas());
    // Check that the dispatched actions match the expected sequence
    // Assertions
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
    // Optionally, check that fetch was called
    expect(fetch).toHaveBeenCalledWith(baseUrl + 'areas');
  });
});