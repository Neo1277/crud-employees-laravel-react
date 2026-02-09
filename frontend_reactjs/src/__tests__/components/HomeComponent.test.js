import { render, screen } from '@testing-library/react';
import HeaderComponent from '../../components/HeaderComponent';

describe('HeaderComponent', () => {
  it('renders Home link', () => {
    render(<HeaderComponent />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});