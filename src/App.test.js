import { render, screen } from '@testing-library/react';
import App from './App';

test('renders vegas vickie', () => {
  render(<App />);
  const linkElement = screen.getByText(/vegas vickie/i);
  expect(linkElement).toBeInTheDocument();
});
