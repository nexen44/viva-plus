import { render, screen } from '@testing-library/react';
import App from '@/app/App';

describe('Module 0', () => {
  it('renders', () => {
    render(<App />);
    expect(screen.getByText(/Viva\+/)).toBeInTheDocument();
  });
});
