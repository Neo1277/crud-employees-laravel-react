import { render, screen, fireEvent } from '@testing-library/react';
import SearchClientComponent from '../../components/SearchClientComponent';
import { baseUrl } from '../../shared/baseUrl';

describe('SearchClientComponent', () => {
  it('calls fetchClients with correct URL when form is submitted', () => {
    const fetchClientsMock = jest.fn();

    render(
      <SearchClientComponent fetchClients={fetchClientsMock} />
    );

    // select "Filter by"
    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, {
      target: { value: 'identity_document' },
    });

    // type search word
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, {
      target: { value: '1144074117' },
    });

    // submit the form
    const form = screen.getByTestId('SearchClientForm');
    fireEvent.submit(form);

    // assertion
    expect(fetchClientsMock).toHaveBeenCalledTimes(1);
    expect(fetchClientsMock).toHaveBeenCalledWith(
      `${baseUrl}clients?identity_document=1144074117`
    );
  });
});