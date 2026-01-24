import { render, screen, fireEvent } from "@testing-library/react";
import AddClientComponent from '../../components/AddClientComponent';


describe('Add Client component', () => {
    
    it("renders loading state initially", () => {

        const mockHandleSubmit = jest.fn();
        const props = {
            createClient: mockHandleSubmit,
            typesOfIdentityDocument: {
                isLoading: true,
                errorMessage: null,
                typesOfIdentityDocument: []
            },
            areas: {
                isLoading: false,
                errorMessage: null,
                areas: {
                    data: 
                    [
                        {
                            'id': 1,
                            'name' : "Basement",
                        },
                        {
                            'id': 2,
                            'name' : "basement 2"
                        }
                    ]                    
                }
            },
            newEmail: {
                isLoading: true,
                errorMessage: null,
                areas: []
            }
            // ... other redux-form props
        };
        render(<AddClientComponent {...props} />);
        expect(screen.getAllByText(/Loading.../i)[0]).toBeInTheDocument();
    });

    it('renders the add client form', () => {
        const mockHandleSubmit = jest.fn();
        const props = {
            createClient: mockHandleSubmit,
            typesOfIdentityDocument: {
                isLoading: false,
                errorMessage: null,
                typesOfIdentityDocument: {
                    data: 
                    [
                        {
                            'id': 1,
                            'code' : "123",
                            'description' : "Cedula de ciudadania"
                        },
                        {
                            'id': 2,
                            'code' : "1234",
                            'description' : "Cedula de extranjeria"
                        }
                    ]                    
                }
            },
            areas: {
                isLoading: false,
                errorMessage: null,
                areas: {
                    data: 
                    [
                        {
                            'id': 1,
                            'name' : "Basement",
                        },
                        {
                            'id': 2,
                            'name' : "basement 2"
                        }
                    ]                    
                }
            },
            newEmail: {
                isLoading: true,
                errorMessage: null,
                areas: []
            }
            // ... other redux-form props
        };
        render(<AddClientComponent {...props} />);
        
        const type_of_identity_document_id = screen.getByLabelText('Type of identity document');
        const identity_document = screen.getByLabelText('Identity document');
        const first_last_name = screen.getByLabelText('First Lastname');
        const second_last_name = screen.getByLabelText('Second LastName');
        const first_name = screen.getByLabelText('First Name');
        const other_names = screen.getByLabelText('Other Names');
        const email = screen.getByLabelText('Email');
        const country = screen.getByLabelText('Country');
        const date_of_entry = screen.getByLabelText('Date of entry');
        const status = screen.getByLabelText('Status');
        const area_id = screen.getByLabelText('Area');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        
        expect(type_of_identity_document_id).toBeInTheDocument();
        expect(identity_document).toBeInTheDocument();
        expect(first_last_name).toBeInTheDocument();
        expect(second_last_name).toBeInTheDocument();
        expect(first_name).toBeInTheDocument();
        expect(other_names).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(country).toBeInTheDocument();
        expect(date_of_entry).toBeInTheDocument();
        expect(status).toBeInTheDocument();
        expect(area_id).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('submits the form with invalid data', () => {
        const mockHandleSubmit = jest.fn();
        const props = {
            createClient: mockHandleSubmit,
            typesOfIdentityDocument: {
                isLoading: false,
                errorMessage: null,
                typesOfIdentityDocument: {
                    data: 
                    [
                        {
                            'id': 1,
                            'code' : "123",
                            'description' : "Cedula de ciudadania"
                        },
                        {
                            'id': 2,
                            'code' : "1234",
                            'description' : "Cedula de extranjeria"
                        }
                    ]                    
                }
            },
            areas: {
                isLoading: false,
                errorMessage: null,
                areas: {
                    data: 
                    [
                        {
                            'id': 1,
                            'name' : "Basement",
                        },
                        {
                            'id': 2,
                            'name' : "basement 2"
                        }
                    ]                    
                }
            },
            newEmail: {
                isLoading: true,
                errorMessage: null,
                areas: []
            }
            // ... other redux-form props
        };
        render(<AddClientComponent {...props} />);

        const type_of_identity_document_id = screen.getByLabelText('Type of identity document');
        const identity_document = screen.getByLabelText('Identity document');
        const first_last_name = screen.getByLabelText('First Lastname');
        const second_last_name = screen.getByLabelText('Second LastName');
        const first_name = screen.getByLabelText('First Name');
        const other_names = screen.getByLabelText('Other Names');
        const email = screen.getByLabelText('Email');
        const country = screen.getByLabelText('Country');
        const date_of_entry = screen.getByLabelText('Date of entry');
        const status = screen.getByLabelText('Status');
        const area_id = screen.getByLabelText('Area');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        
        fireEvent.change(type_of_identity_document_id, { target: { value: '1' } });
        fireEvent.change(identity_document, { target: { value: '123456ñ' } });
        fireEvent.change(first_last_name, { target: { value: 'meneses' } });
        fireEvent.change(second_last_name, { target: { value: 'BEJARANO' } });
        fireEvent.change(first_name, { target: { value: 'SULLY' } });
        fireEvent.change(other_names, { target: { value: 'ANDREA' } });
        fireEvent.change(email, { target: { value: 'sully@gmail.com' } });
        fireEvent.change(country, { target: { value: 'co' } });
        fireEvent.change(date_of_entry, { target: { value: '2026-01-11' } });
        fireEvent.change(status, { target: { value: 'Active' } });
        fireEvent.change(area_id, { target: { value: '1' } });
        fireEvent.click(submitButton);
        
        expect(screen.getByTestId('identity_document_error').textContent)
            .toBe('Identity document must contain only alphanumeric characters');
        expect(screen.getByTestId('first_last_name_error').textContent)
            .toBe('Only uppercase letters (A-Z) are allowed, with one space among words and not special characters.');
    });

    it('submits the form with valid data', () => {
        const mockHandleSubmit = jest.fn();
        const props = {
            createClient: mockHandleSubmit,
            typesOfIdentityDocument: {
                isLoading: false,
                errorMessage: null,
                typesOfIdentityDocument: {
                    data: 
                    [
                        {
                            'id': 1,
                            'code' : "123",
                            'description' : "Cedula de ciudadania"
                        },
                        {
                            'id': 2,
                            'code' : "1234",
                            'description' : "Cedula de extranjeria"
                        }
                    ]                    
                }
            },
            areas: {
                isLoading: false,
                errorMessage: null,
                areas: {
                    data: 
                    [
                        {
                            'id': 1,
                            'name' : "Basement",
                        },
                        {
                            'id': 2,
                            'name' : "basement 2"
                        }
                    ]                    
                }
            },
            newEmail: {
                isLoading: true,
                errorMessage: null,
                areas: []
            }
            // ... other redux-form props
        };
        render(<AddClientComponent {...props} />);

        const type_of_identity_document_id = screen.getByLabelText('Type of identity document');
        const identity_document = screen.getByLabelText('Identity document');
        const first_last_name = screen.getByLabelText('First Lastname');
        const second_last_name = screen.getByLabelText('Second LastName');
        const first_name = screen.getByLabelText('First Name');
        const other_names = screen.getByLabelText('Other Names');
        const email = screen.getByLabelText('Email');
        const country = screen.getByLabelText('Country');
        const date_of_entry = screen.getByLabelText('Date of entry');
        const status = screen.getByLabelText('Status');
        const area_id = screen.getByLabelText('Area');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        
        fireEvent.change(type_of_identity_document_id, { target: { value: '1' } });
        fireEvent.change(identity_document, { target: { value: '123456' } });
        fireEvent.change(first_last_name, { target: { value: 'MENESES' } });
        fireEvent.change(second_last_name, { target: { value: 'BEJARANO' } });
        fireEvent.change(first_name, { target: { value: 'SULLY' } });
        fireEvent.change(other_names, { target: { value: 'ANDREA' } });
        fireEvent.change(email, { target: { value: 'sully@gmail.com' } });
        fireEvent.change(country, { target: { value: 'co' } });
        fireEvent.change(date_of_entry, { target: { value: '2026-01-11' } });
        fireEvent.change(status, { target: { value: 'Active' } });
        fireEvent.change(area_id, { target: { value: '1' } });
        fireEvent.click(submitButton);
        
        //fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
        
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it("renders error message when the fetch fails", () => {

        const mockHandleSubmit = jest.fn();
        const props = {
            createClient: mockHandleSubmit,
            typesOfIdentityDocument: {
                isLoading: false,
                errorMessage: "Failed to fetch"
            },
            areas: {
                isLoading: false,
                errorMessage: null,
                areas: {
                    data: 
                    [
                        {
                            'id': 1,
                            'name' : "Basement",
                        },
                        {
                            'id': 2,
                            'name' : "basement 2"
                        }
                    ]                    
                }
            },
            newEmail: {
                isLoading: true,
                errorMessage: null,
                areas: []
            }
            // ... other redux-form props
        };
        render(<AddClientComponent {...props} />);
        expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
});