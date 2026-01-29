import { render, screen } from '@testing-library/react';
import FooterComponent from '../../components/FooterComponent';

describe('FooterComponent', () => {
  test('renders copyright text', () => {
    render(<FooterComponent />);

    const copyrightText =
      screen.getByText(/© copyright 2026 marlon/i);

    expect(copyrightText).toBeInTheDocument();
  });
});