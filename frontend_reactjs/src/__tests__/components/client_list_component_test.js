// ClientList.test.js
import { render, screen, waitFor } from "@testing-library/react";
import ClientListComponent from '../../components/ClientListComponent';;
import { fetchClients } from '../../redux/ActionCreators/clientActions';

jest.mock("../../redux/ActionCreators/clientActions");

describe('Client List', () => {

    it("renders loading state initially", () => {
        fetchClients.mockResolvedValue([]);
        render(<ClientListComponent />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it("renders clients after data is fetched", async () => {
        const clients = {
            'data':
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
            }
        };
        fetchClients.mockResolvedValue(clients);
        render(<ClientListComponent />);

        await waitFor(() => {
            expect(screen.getByText(/MENESES/i)).toBeInTheDocument();
        });
    });

    it("renders error message when the fetch fails", async () => {
        fetchClients.mockRejectedValue(new Error("Failed to fetch"));
        render(<ClientListComponent />);

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
        });
    });

});