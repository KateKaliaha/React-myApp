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

    expect(screen.getAllByRole('img')).toBeInTheDocument;
    expect(screen.queryByTestId('root')).toBeInTheDocument;
    expect(document.getElementById('root')).toBeInTheDocument;
  });
});
