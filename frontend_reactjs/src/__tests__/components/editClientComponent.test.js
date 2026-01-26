import { render, screen, fireEvent } from "@testing-library/react";
import EditClientComponent from '../../components/EditClientComponent';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

const defaultProps = {
  fetchClientById: jest.fn(),
  updateClient: jest.fn(),
  typesOfIdentityDocument: {
    isLoading: false,
    errorMessage: null,
    typesOfIdentityDocument: {
      data: [
        { id: 1, code: '123', description: 'Cedula de ciudadania' },
        { id: 2, code: '1234', description: 'Cedula de extranjeria' },
      ],
    },
  },
  areas: {
    isLoading: false,
    errorMessage: null,
    areas: {
      data: [
        { id: 1, name: 'Basement' },
        { id: 2, name: 'Basement 2' },
      ],
    },
  },
  newEmail: {
    isLoading: true,
    errorMessage: null,
    areas: [],
  },
};

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
/**
 * overrides lets you change only the props you care about for a specific test, 
 * while keeping sensible defaults for everything else.
 */
const renderComponent = (overrides = {}) =>
  render(<EditClientComponent {...defaultProps} {...overrides} />);

const getFormFields = () => ({
  typeOfIdentityDocument: screen.getByLabelText('Type of identity document'),
  identityDocument: screen.getByLabelText('Identity document'),
  firstLastName: screen.getByLabelText('First Lastname'),
  secondLastName: screen.getByLabelText('Second LastName'),
  firstName: screen.getByLabelText('First Name'),
  otherNames: screen.getByLabelText('Other Names'),
  email: screen.getByLabelText('Email'),
  country: screen.getByLabelText('Country'),
  dateOfEntry: screen.getByLabelText('Date of entry'),
  status: screen.getByLabelText('Status'),
  area: screen.getByLabelText('Area'),
  submit: screen.getByRole('button', { name: /Edit/i }),
});

const fillForm = (overrides = {}) => {
  const fields = getFormFields();

  const data = {
    typeOfIdentityDocument: '1',
    identityDocument: '123456',
    firstLastName: 'MENESES',
    secondLastName: 'BEJARANO',
    firstName: 'SULLY',
    otherNames: 'ANDREA',
    email: 'sully@gmail.com',
    country: 'co',
    dateOfEntry: '2026-01-11',
    status: 'Active',
    area: '1',
    ...overrides,
  };

  // Loop over data (DRY)
  Object.entries(data).forEach(([key, value]) => {
    fireEvent.change(fields[key], { target: { value } });
  });

  return fields;
};

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

    const fields = fillForm({
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

    const fields = fillForm();
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