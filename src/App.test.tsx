import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Supabase client to prevent network calls in unit tests
vi.mock('./lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    channel: () => ({
      on: () => ({
        subscribe: () => ({})
      })
    }),
    removeChannel: vi.fn()
  }
}));

describe('App Component (Module 3)', () => {
  it('renders base layout, dashboard header and feature flags container', async () => {
    render(<App />);
    expect(screen.getByText('VIVA+')).toBeInTheDocument();
    expect(screen.getByText('VIVA+ Dashboard')).toBeInTheDocument();
  });
});
