import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from 'component/Search/Search';
import React from 'react';

describe('SearchBar', () => {
  it('text in input placeholder', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/Поиск.../i);

    expect(input).toBeInTheDocument;
  });

  it('input focus', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/Поиск.../i);

    expect(input).not.toHaveFocus;
    input.focus();
    expect(input).toHaveFocus;
  });

  it('input value', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/Поиск.../i);

    expect(input).toHaveValue('');
    userEvent.type(input, '1234');
    expect(input).toHaveValue('1234');
    expect(input).not.toHaveValue('12345');
  });

  it('times call method handleChange', () => {
    const handleChange = jest.fn();
    render(<input type="search" onChange={handleChange} placeholder="Поиск..."></input>);
    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), '12');
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
