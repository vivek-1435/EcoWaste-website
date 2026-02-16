import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders EcoWaste title', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const titleElement = screen.getByRole('heading', { name: /Waste into Wealth/i });
  expect(titleElement).toBeInTheDocument();
});
