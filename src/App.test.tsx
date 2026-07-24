import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component (Module 1)', () => {
  it('renders the base layout and home page', () => {
    render(<App />);
    expect(screen.getByText('VIVA+')).toBeInTheDocument();
    expect(screen.getByText('Welcome to VIVA+')).toBeInTheDocument();
  });
});
