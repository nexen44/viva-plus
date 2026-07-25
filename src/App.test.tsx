import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }),
    channel: () => ({
      on: () => ({ subscribe: () => ({}) }),
    }),
    removeChannel: vi.fn(),
    auth: {
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}));

describe('App Component (Module 4)', () => {
  it('renders base layout, dashboard header and auth widget', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // findByText aguarda a resolução assíncrona do getSession antes de checar
    expect(await screen.findByText('VIVA+')).toBeInTheDocument();
    expect(screen.getByText('VIVA+ Dashboard')).toBeInTheDocument();
  });
});
