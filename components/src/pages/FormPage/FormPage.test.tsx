import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { FormPage } from './FormPage';
import { renderWithProviders } from '../../utils/test-utils';

const reviewArr = [
  {
    name: 'Denis',
    birthday: '2010-03-12',
    photo: 'c/fff.png',
    review: 'Everything is good!',
    mark: '5',
    data: true,
    gender: 'male',
  },
  {
    name: 'Olga',
    birthday: '2010-03-12',
    photo: 'c/fff.png',
    review: 'Everything is bad!',
    mark: '2',
    data: true,
    gender: 'female',
  },
];

describe('Form page', () => {
  afterEach(cleanup);

  it('render content form page', async () => {
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<FormPage />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const formPage = screen.getByTestId('form-page');
    const form = screen.getByTestId('form');
    const formContent = screen.getByTestId('form-content');

    expect(formPage).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(formContent).toBeInTheDocument();
  });

  it('first render content to be equal null', async () => {
    const initialState = {
      cardForm: [],
    };

    renderWithProviders(<FormPage />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const formContent = screen.getByTestId('form-content');

    expect(formContent.innerHTML).toEqual('');
  });
});
