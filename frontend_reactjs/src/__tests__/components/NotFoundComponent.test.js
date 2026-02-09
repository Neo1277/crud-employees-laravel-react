import { render, screen } from '@testing-library/react';
import NotFoundComponent from '../../components/NotFoundComponent';

describe('NotFoundComponent', () => {
  test('renders 404 message', () => {
    render(<NotFoundComponent />);
    
    // Check if the heading is displayed
    const heading = screen.getByText(/404 Not Found/i);
    expect(heading).toBeInTheDocument();

    // Check if the paragraph is displayed
    const paragraph = screen.getByText(/Oops! Page not found./i);
    expect(paragraph).toBeInTheDocument();
  });
});