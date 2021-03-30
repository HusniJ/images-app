import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Image Book', () => {
  render(<App />);
  const linkElement = screen.getByText(/Image Book/);
  expect(linkElement).toBeInTheDocument();
});
