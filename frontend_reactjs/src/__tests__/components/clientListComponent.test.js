// ClientList.test.js
import { render, screen } from "@testing-library/react";
import ClientListComponent from '../../components/ClientListComponent';
import { MemoryRouter } from 'react-router';

describe('Client List', () => {

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
    });

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
                    ],    
                    links: {
                        first: "http://127.0.0.1:8000/api/clients?page=1",
                        last: "http://127.0.0.1:8000/api/clients?page=4",
                        prev: null,
                        next: "http://127.0.0.1:8000/api/clients?page=2"
                    },    
                    meta: {
                        current_page: 1,
                        total: 37
                    }
                }
            }
        }

        render(
            <MemoryRouter>
                <ClientListComponent {...mockProps} />
            </MemoryRouter>
        );
        
        expect(screen.getByText(/MENESES/i)).toBeInTheDocument();
        
    });

    it("renders error message when the fetch fails", () => {
        
        const mockProps = {
            clients: {
                isLoading: false,
                errorMessage: "Failed to fetch"
            }
        };
        render(<ClientListComponent {...mockProps} />);

        expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });

});