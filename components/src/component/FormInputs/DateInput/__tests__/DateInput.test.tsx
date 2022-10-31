import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'component/Form/Form';
import React from 'react';

describe('DateInput:', () => {
  beforeEach(cleanup);

  it('type valid date not to call errors', async () => {
    render(<Form />);

    const date = screen.getByTestId('birthday');
    const btnSubmit = screen.getByTestId('btn-submit');

    await act(async () => {
      await fireEvent.change(date, { target: { value: '2010-11-01' } });
      await userEvent.click(btnSubmit);
    });

    expect(screen.queryByText('Возраст должен быть больше 7 лет')).not.toBeInTheDocument();
    expect(screen.queryByText('Введите дату рождения')).not.toBeInTheDocument();
  });

  it('type invalid date to call validate error', async () => {
    render(<Form />);

    const date = screen.getByTestId('birthday');
    const btnSubmit = screen.getByTestId('btn-submit');

    await act(async () => {
      await fireEvent.change(date, { target: { value: '2020-11-01' } });
      await userEvent.click(btnSubmit);
    });

    expect(screen.queryByText('Возраст должен быть больше 7 лет')).toBeInTheDocument();
  });
});
