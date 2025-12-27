import {combineReducers, applyMiddleware} from 'redux';
import { Clients } from './reducers/clients';
//import { Areas } from './reducers/areas_reducer';
//import { TypesOfIdentityDocument } from './reducers/types_of_identity_document_reducer';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import {legacy_createStore as createStore} from 'redux'

/* Configure store for letting the data be there even if the page is reloaded */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            clients: Clients,
            /*areas: Areas,
            types_of_identity_document: TypesOfIdentityDocument,*/
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}