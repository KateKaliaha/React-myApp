import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { FormCard } from 'component/FormCard/FormCard';
import { IFormCard } from 'data/interfaces';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { act } from 'react-dom/test-utils';

const changeStateCard = jest.fn();

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

const newReviewArr = [
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
    birthday: '2005-05-22',
    photo: 'c/fff.png',
    review: 'Everything is bad!',
    mark: '2',
    data: true,
    gender: 'female',
  },
  {
    name: 'Oleg',
    birthday: '2000-06-01',
    photo: 'c/fff.png',
    review: 'Everything is bad!',
    mark: '4',
    data: true,
    gender: 'male',
  },
];

describe('Form', () => {
  afterEach(cleanup);
  it('render content from page with not empty data', async () => {
    act(() => {
      render(
        <div className="form-page" data-testid="form-page">
          <div className="form-content" data-testid="form-content">
            {reviewArr.map((el, i) => (
              <FormCard key={i} card={el} />
            ))}
          </div>
        </div>
      );
    });

    const formContent = screen.getByTestId('form-content');
    expect(formContent).toBeInTheDocument();

    const formCard = screen.getAllByTestId('review-card');
    expect(formCard.length).toBe(2);

    const formData = screen.getByText(/Everything is good!/i);
    expect(formData).toBeInTheDocument();
  });

  it('first render error for name to be equal null', async () => {
    act(() => {
      render(<Form />);
    });

    const errors = screen.getAllByTestId('error');
    expect(errors[0].innerHTML).toEqual('');
  });

  it('check disable button in form', async () => {
    act(() => {
      render(<Form />);
    });

    const buttonSubmit = screen.getByRole('button');
    expect(buttonSubmit).toHaveAttribute('disabled');

    const input = screen.getByTestId('name');

    userEvent.type(input, 'k');

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    userEvent.clear(input);
  });

  it('check not disable button in the form after type in input', async () => {
    act(() => {
      render(<Form />);
    });

    const input = screen.getByTestId('name');
    userEvent.type(input, 'k');
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    userEvent.clear(input);
  });

  it('render new content form page after change array of review', async () => {
    changeStateCard.mockReturnValue(newReviewArr);
    const arr = changeStateCard();
    act(() => {
      render(
        <div className="form-page" data-testid="form-page">
          <Form changeCards={changeStateCard} />
          <div className="form-content" data-testid="form-content">
            {arr.map((el: IFormCard, i: React.Key | null | undefined) => (
              <FormCard key={i} card={el} />
            ))}
          </div>
        </div>
      );
    });

    const formCard = screen.getAllByTestId('review-card');
    expect(formCard.length).toBe(3);
  });
});
