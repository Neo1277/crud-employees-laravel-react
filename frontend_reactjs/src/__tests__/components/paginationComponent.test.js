// ClientList.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from '../../components/PaginationComponent';


const mockProps = {
  fetchClients: jest.fn(),
  clients: {
    clients: {
      links: {
        first: "http://127.0.0.1:8000/api/clients?page=1",
        last: "http://127.0.0.1:8000/api/clients?page=4",
        prev: null,
        next: "http://127.0.0.1:8000/api/clients?page=2"
      },
      meta: {
        current_page: 1,
        total: 100,
      },
    },
  },
};

describe('Pagination Component', () => {
    it('renders pagination and meta info', () => {
        render(<PaginationComponent {...mockProps} />);

        expect(screen.getByLabelText('clients-pagination')).toBeInTheDocument();
        expect(screen.getByText(/Current page: 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Amount of registers: 100/i)).toBeInTheDocument();
    });

    it('disables prev button when no prev link', () => {
        render(<PaginationComponent {...mockProps} />);

        const prevButton = screen.getByLabelText(/previous/i);
        // Click button when prev is null (disabled)
        fireEvent.click(prevButton);
        expect(mockProps.fetchClients).not.toHaveBeenCalled();
    });

    it('calls fetchClients when next page is clicked', () => {
        render(<PaginationComponent {...mockProps} />);

        const nextButton = screen.getByLabelText(/next/i);

        fireEvent.click(nextButton);

        expect(mockProps.fetchClients).toHaveBeenCalledTimes(1);
        expect(mockProps.fetchClients).toHaveBeenCalledWith(
            'http://127.0.0.1:8000/api/clients?page=2'
        );
    });

    it('does not call fetchClients if link is null', () => {
        const propsWithoutNext = {
            ...mockProps,
            clients: {
                clients: {
                    ...mockProps.clients.clients,
                    links: {
                        ...mockProps.clients.clients.links,
                        next: null,
                    },
                },
            },
        };

        render(<PaginationComponent {...propsWithoutNext} />);

        const nextButton = screen.getByLabelText(/next/i);

        // Click button when next is null (disabled)
        fireEvent.click(nextButton);

        expect(mockProps.fetchClients).not.toHaveBeenCalled();
    });

});