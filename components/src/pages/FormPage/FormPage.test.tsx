import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { FormPage } from './FormPage';

describe('Form page', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  it('render content form page', async () => {
    await act(async () => {
      await render(<FormPage />);
    });

    const formPage = screen.getByTestId('form-page');
    const form = screen.getByTestId('form');
    const formContent = screen.getByTestId('form-content');

    expect(formPage).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(formContent).toBeInTheDocument();
  });

  it('first render content to be equal null', async () => {
    await act(async () => {
      await render(<FormPage />);
    });

    const formContent = screen.getByTestId('form-content');

    expect(formContent.innerHTML).toEqual('');
  });
});
