import { render, screen, fireEvent } from "@testing-library/react";
import AddClientComponent from '../../components/AddClientComponent';


export const getFormFields = (submitLabel = /submit/i) => ({
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
  submit: screen.getByRole('button', { name: submitLabel }),
});

export const fillForm = (submitLabel, overrides = {}) => {
  const fields = getFormFields(submitLabel);

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

  Object.entries(data).forEach(([key, value]) => {
    fireEvent.change(fields[key], { target: { value } });
  });

  return fields;
};

export const sharedClientProps = {
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

const defaultProps = {
  ...sharedClientProps,
  createClient: jest.fn(), // Add-specific
};

/**
 * overrides lets you change only the props you care about for a specific test, 
 * while keeping sensible defaults for everything else.
 */
const renderComponent = (overrides = {}) =>
  render(<AddClientComponent {...defaultProps} {...overrides} />);

describe('Add Client component', () => {
    
    it("renders loading state initially", () => {
      renderComponent({
          typesOfIdentityDocument: { isLoading: true },
      });

      expect(screen.getAllByText(/Loading.../i)[0]).toBeInTheDocument();
    });
    
    it('shows validation errors with invalid data', () => {
      renderComponent();

      const fields = fillForm(/submit/i, {
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
      const createClient = jest.fn();

      renderComponent({ createClient });

      const fields = fillForm(/submit/i);
      fireEvent.click(fields.submit);

      expect(createClient).toHaveBeenCalledTimes(1);
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