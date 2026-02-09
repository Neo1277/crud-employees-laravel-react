import { render, screen, fireEvent } from "@testing-library/react";
import EditClientComponent from '../../components/EditClientComponent';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fillForm } from './AddClientComponent.test';
import { sharedClientProps } from './AddClientComponent.test';

// Mock react redux useSelector
// Replace the entire react-redux module
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mock react router useParams
// Replace the entire react-router module
jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

const mockClient = {
  data: {
    type_of_identity_document_id: 1,
    identity_document: '123456',
    first_last_name: 'MENESES',
    second_last_name: 'BEJARANO',
    first_name: 'SULLY',
    other_names: 'ANDREA',
    email: 'sully.meneses@example.com.co',
    country: 'co',
    date_of_entry: '2023-01-01',
    status: 'Active',
    area_id: 1,
  },
};

const defaultProps = {
  ...sharedClientProps,
  fetchClientById: jest.fn(),
  updateClient: jest.fn(), // Edit-specific
};

/**
 * overrides lets you change only the props you care about for a specific test, 
 * while keeping sensible defaults for everything else.
 */
const renderComponent = (overrides = {}) =>
  render(<EditClientComponent {...defaultProps} {...overrides} />);

describe('Edit Client component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ clientId: '1' });

    useSelector.mockImplementation(() => ({
      isLoading: false,
      errorMessage: null,
      client: mockClient,
    }));
  });

  it("renders loading state initially", () => {
    renderComponent({
        typesOfIdentityDocument: { isLoading: true },
    });

    expect(screen.getAllByText(/Loading.../i)[0]).toBeInTheDocument();
  });

  it('renders edit client form with prefilled data', () => {
    renderComponent();

    expect(screen.getByDisplayValue('SULLY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('MENESES')).toBeInTheDocument();
    expect(screen.getByDisplayValue('sully.meneses@example.com.co')).toBeInTheDocument();
  });

  it('calls fetchClientById with clientId', () => {
    renderComponent();

    expect(defaultProps.fetchClientById).toHaveBeenCalledWith('1');
  });

  it('shows validation errors with invalid data', () => {
    renderComponent();
    
    // Reuse fillForm and set the name button parameter edit
    const fields = fillForm(/edit/i, {
      identityDocument: '123456ñ',
      firstLastName: 'meneses',
    });

    fireEvent.click(fields.submit);

    expect(screen.getByTestId('identity_document_error'))
        .toHaveTextContent('Identity document must contain only alphanumeric characters');

    expect(screen.getByTestId('first_last_name_error'))
        .toHaveTextContent(
            'Only uppercase letters (A-Z) are allowed, with one space among words and not special characters.'
        );
  });

  it('submits the form with valid data', () => {
    const updateClient = jest.fn();

    renderComponent({ updateClient });

    // Reuse fillForm and set the name button parameter edit
    const fields = fillForm(/edit/i);
    fireEvent.click(fields.submit);

    expect(updateClient).toHaveBeenCalledTimes(1);
  });

  it('renders error message when fetch fails', () => {
    renderComponent({
        typesOfIdentityDocument: {
            isLoading: false,
            errorMessage: 'Failed to fetch',
        },
    });

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

});