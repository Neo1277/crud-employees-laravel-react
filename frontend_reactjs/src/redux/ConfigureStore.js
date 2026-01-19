import {combineReducers, applyMiddleware} from 'redux';
import { Clients } from './reducers/clients';
import { Areas } from './reducers/areas';
import { TypesOfIdentityDocument } from './reducers/typesOfIdentityDocument';
import { NewEmail } from './reducers/newEmail';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import {legacy_createStore as createStore} from 'redux'

/* Configure store for letting the data be there even if the page is reloaded */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            clients: Clients,
            areas: Areas,
            typesOfIdentityDocument: TypesOfIdentityDocument,
            newEmail: NewEmail,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}