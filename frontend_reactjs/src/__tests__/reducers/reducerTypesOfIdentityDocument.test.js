import { TypesOfIdentityDocument } from '../../redux/reducers/typesOfIdentityDocument';
import { 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS, 
  FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE 
} from '../../redux/ActionTypes';

describe('TypesOfIdentityDocument reducer', () => {

  it('should handle FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST', () => {
    const startAction = {
      type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_REQUEST
    };
    const expectedState = { isLoading: true, errorMessage: null, typesOfIdentityDocument: [] };
    // it's empty on purpose because it's just starting to fetch clients
    expect(TypesOfIdentityDocument(undefined, startAction)).toEqual(expectedState);
  });

  it('should handle FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS', () => {
    const typesOfIdentityDocument = {
        'data':
        {
            'id': 1,
            'code' : "123",
            'description' : "Cedula de ciudadania",
        }
    };
    const action = { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_SUCCESS, payload: typesOfIdentityDocument };
    const expectedState = { isLoading: false, errorMessage: null, typesOfIdentityDocument: typesOfIdentityDocument };
    expect(TypesOfIdentityDocument({ isLoading: false, errorMessage: null, typesOfIdentityDocument: [] }, action))
    .toEqual(expectedState);
  });

  it('should handle FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_TYPES_OF_IDENTITY_DOCUMENT_FAILURE, payload: error };
    const expectedState = { isLoading: false, errorMessage: error };
    expect(TypesOfIdentityDocument({ isLoading: false, errorMessage: error }, action)).toEqual(expectedState);
  });
});