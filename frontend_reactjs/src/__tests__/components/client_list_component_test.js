// ClientList.test.js
import { render, screen, waitFor } from "@testing-library/react";
import ClientListComponent from '../../components/ClientListComponent';;
import { fetchClients } from '../../redux/ActionCreators/clientActions';
import { ConfigureStore } from '../../redux/ConfigureStore';
//import * as Actions from '../../redux/ActionTypes';
import * as Actions  from '../../redux/ActionCreators/clientActions';
import { Provider } from "react-redux";

const store = ConfigureStore();

jest.mock("../../redux/ActionCreators/clientActions");

const fetchDataSpy = jest
  .spyOn(Actions, "fetchClients")
  .mockImplementation(() => () => Promise.resolve());

const Providers = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Client List', () => {

    /*
    it("renders loading state initially", () => {
        fetchClients.mockResolvedValue([]);

        const mockProps = {
            'isLoading': true,
            'errorMessaje': null,
            'clients': {}
        };
        render(<ClientListComponent {...mockProps} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });*/

    it("renders clients after data is fetched", () => {
        const clients = {
            'clients':
            {
                'data':
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
        };
        const mockProps = {
            isLoading: false, errorMessage: null, clients: clients
        };

        //fetchClients.mockResolvedValue(clients);
        /*render(<ClientListComponent {...mockProps} />, {
            wrapper: Providers
        });*/

        render(<ClientListComponent {...mockProps} />);

        //expect(fetchDataSpy).toBeCalledWith("Loading");

        
        expect(screen.getByText(/MENESES/i)).toBeInTheDocument();
        
    });

    /*
    it("renders error message when the fetch fails", async () => {
        fetchClients.mockRejectedValue(new Error("Failed to fetch"));
        render(<ClientListComponent />);

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
        });
    });*/

});