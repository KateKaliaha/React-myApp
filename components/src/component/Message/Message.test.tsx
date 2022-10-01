import { render, screen } from '@testing-library/react';
import React from 'react';
import { Message } from './Message';

describe('SearchBar', () => {
  it('text in input placeholder', () => {
    render(<Message />);

    const message = screen.getByRole('heading');
    const messageValue = screen.getByText(/Извините, совпадений не найдено/i);

    expect(message).toBeInTheDocument;
    expect(messageValue).toBeInTheDocument;
  });
});
