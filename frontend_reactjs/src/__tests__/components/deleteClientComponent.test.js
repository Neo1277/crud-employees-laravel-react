import { render, screen, fireEvent } from "@testing-library/react";
import DeleteClientComponent from '../../components/DeleteClientComponent';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

const mockClient = {
  data: {
    type_of_identity_document_description: 'Passport',
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
    area: 'IT',
  },
};

const mockUseSelector = (overrides = {}) => {
  useSelector.mockReturnValue({
    isLoading: false,
    errorMessage: null,
    client: mockClient,
    ...overrides,
  });
};

const renderComponent = (props = {}) => {
  const defaultProps = {
    fetchClientById: jest.fn(),
    deleteClient: jest.fn(),
  };

  return render(
    <DeleteClientComponent {...defaultProps} {...props} />
  );
};

describe('Delete Client component', () => {
  // This resets the usage history of all mocks:
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading when isLoading is true', () => {
    // Set the client id in the url
    useParams.mockReturnValue({ clientId: '1' });
    mockUseSelector({ isLoading: true, client: {} });

    renderComponent();

    expect(screen.getAllByText(/Loading.../i)[0]).toBeInTheDocument();
  });

  it('calls fetchClientById on mount', () => {
    // Set the client id in the url
    useParams.mockReturnValue({ clientId: '1' });
    mockUseSelector();

    renderComponent();
  });

  it('renders client data in form', () => {
    // Set the client id in the url
    useParams.mockReturnValue({ clientId: '1' });
    mockUseSelector();

    renderComponent();

    expect(screen.getByDisplayValue('Passport')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('SULLY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('MENESES')).toBeInTheDocument();
  });

  it('calls deleteClient when confirmation is accepted', () => {
    const deleteClient = jest.fn();

    // Confirm delete client
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    // Set the client id in the url
    useParams.mockReturnValue({ clientId: '1' });
    mockUseSelector();

    renderComponent({ deleteClient });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(deleteClient).toHaveBeenCalledWith('1');
  });

  it('does NOT call deleteClient when confirmation is cancelled', () => {
    const deleteClient = jest.fn();

    // Cancel delete client
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    // Set the client id in the url
    useParams.mockReturnValue({ clientId: '1' });
    mockUseSelector();

    renderComponent({ deleteClient });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteClient).not.toHaveBeenCalled();
  });

});