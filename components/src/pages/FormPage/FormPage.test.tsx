import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { FormPage } from './FormPage';

describe('Form page', () => {
  it('render content form page', async () => {
    act(() => {
      render(<FormPage />);
    });

    const formPage = screen.getByTestId('form-page');
    const form = screen.getByTestId('form');
    const formContent = screen.getByTestId('form-content');

    expect(formPage).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(formContent).toBeInTheDocument();
  });

  it('first render content to be equal null', async () => {
    act(() => {
      render(<FormPage />);
    });

    const formContent = screen.getByTestId('form-content');

    expect(formContent.innerHTML).toEqual('');
  });
});
