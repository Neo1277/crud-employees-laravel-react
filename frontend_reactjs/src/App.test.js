import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/Copyright/i);
  expect(linkElement).toBeInTheDocument();
});
