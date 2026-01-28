import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import Main from '../../components/MainComponent';

// Middleware for mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock child components so we don't test their internals
jest.mock('../../components/HeaderComponent', () => () => <div>HeaderComponent</div>);
jest.mock('../../components/FooterComponent', () => () => <div>Footer</div>);
jest.mock('../../components/ClientListComponent', () => () => <div>ClientListComponent</div>);
jest.mock('../../components/AddClientComponent', () => () => <div>AddClientComponent</div>);
jest.mock('../../components/EditClientComponent', () => () => <div>EditClientComponent</div>);
jest.mock('../../components/DeleteClientComponent', () => () => <div>DeleteClientComponent</div>);
jest.mock('../../components/NotFoundComponent', () => () => <div>NotFoundComponent</div>);

describe('Main Component Smoke Test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      clients: { clients: { data: [] } },
      clientById: {},
      areas: [],
      typesOfIdentityDocument: [],
      newEmail: '',
    });
  });

  test('renders Main component without crashing and shows Header, Footer, and ClientListComponent by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    // Check main layout
    expect(screen.getByText('HeaderComponent')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    // Default route "/" renders ClientListComponent
    expect(screen.getByText('ClientListComponent')).toBeInTheDocument();
  });

  test('renders AddClientComponent on /add-client route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/add-client']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('AddClientComponent')).toBeInTheDocument();
  });

  test('renders NotFoundComponent on unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('NotFoundComponent')).toBeInTheDocument();
  });
});