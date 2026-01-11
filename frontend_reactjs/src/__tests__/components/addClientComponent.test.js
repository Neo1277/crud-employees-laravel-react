import { render, screen, fireEvent } from "@testing-library/react";
import AddClientComponent from '../../components/AddClientComponent';


describe('Client List', () => {
    /*
    it("renders loading state initially", () => {

        const mockProps = {
            clients: {
                isLoading: true,
                errorMessage: null,
                clients: []
            }
        };
        render(<ClientListComponent {...mockProps} />);
        expect(screen.getAllByText(/Loading.../i)[0]).toBeInTheDocument();
    });*/

    it('calls handleSubmit on form submission', () => {
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

    /*
    it("renders clients after data is fetched", () => {

        const mockProps = {
            clients: {
                isLoading: false,
                errorMessage: null,
                clients: {
                    data: 
                    [
                        {
                            'id': 1,
                            'identity_document' : "16450360",
                            'first_last_name' : "MENESES",
                            'second_last_name' : "BEJARANO",
                            'first_name' : "SULLY",
                            'other_names' : "ANDREA",
                            'email' : "andrea@gmail.com",
                            'country' : "co",
                            'date_of_entry' : '2025-12-22',
                            'status' : "Active",
                            'type_of_identity_document_id' : 1,
                            'area_id' : 1,
                        },
                        {
                            'id': 2,
                            'identity_document' : "16450360",
                            'first_last_name' : "BEJARANO",
                            'second_last_name' : "SOLARTE",
                            'first_name' : "LUZ",
                            'other_names' : "DARY",
                            'email' : "luz@gmail.com",
                            'country' : "co",
                            'date_of_entry' : '2025-12-22',
                            'status' : "Active",
                            'type_of_identity_document_id' : 1,
                            'area_id' : 1,
                        }
                    ]
                }
            }
        }

        render(
            <MemoryRouter>
                <ClientListComponent {...mockProps} />
            </MemoryRouter>
        );
        
        expect(screen.getByText(/MENESES/i)).toBeInTheDocument();
        
    });*/
    /*
    it("renders error message when the fetch fails", () => {
        
        const mockProps = {
            clients: {
                isLoading: false,
                errorMessage: "Failed to fetch"
            }
        };
        render(<ClientListComponent {...mockProps} />);

        expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });*/

});