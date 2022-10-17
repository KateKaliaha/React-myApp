import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';

describe('App', () => {
  it('render cards in App', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const img = screen.queryAllByTestId('img-card');
    expect(img.length).toBe(0);
    expect(screen.queryByTestId('root')).not.toBeInTheDocument();
  });
});
