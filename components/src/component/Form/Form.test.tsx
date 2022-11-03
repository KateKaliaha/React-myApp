import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
// import { FormCard } from 'component/FormCard/FormCard';
// import { IFormCard } from 'data/interfaces';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { act } from 'react-dom/test-utils';
// import { Provider } from 'react-redux';
// import store from 'store';
// import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { FormPage } from 'pages/FormPage/FormPage';

// const changeStateCard = jest.fn();
window.URL.createObjectURL = function () {
  return 'c/fff.png';
};
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

export const reviewArr = [
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
  afterEach(() => cleanup());
  it('render content from page with not empty data', async () => {
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<FormPage />, {
      preloadedState: {
        formCard: initialState,
      },
    });
    // act(() => {
    //   render(
    //     <div className="form-page" data-testid="form-page">
    //       <div className="form-content" data-testid="form-content">
    //         {reviewArr.map((el, i) => (
    //           <FormCard key={i} card={el} />
    //         ))}
    //       </div>
    //     </div>
    //   );
    // });

    const formContent = screen.getByTestId('form-content');
    expect(formContent).toBeInTheDocument();

    const formCard = screen.getAllByTestId('review-card');
    expect(formCard.length).toBe(2);

    const formData = screen.getByText(/Everything is good!/i);
    expect(formData).toBeInTheDocument();
  });

  it('first render error for name to be equal null', async () => {
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<Form />, {
      preloadedState: {
        formCard: initialState,
      },
    });
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <Form />
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });

    const errors = screen.getAllByTestId('error');
    expect(errors[0].innerHTML).toEqual('');
  });

  it('check disable button in form', async () => {
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <Form />
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<Form />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const buttonSubmit = screen.getByRole('button');
    expect(buttonSubmit).toHaveAttribute('disabled');

    const input = screen.getByTestId('name');

    userEvent.type(input, 'k');

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    userEvent.clear(input);
  });

  it('check not disable button in the form after type in input', async () => {
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <Form />
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<Form />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const input = screen.getByTestId('name');
    userEvent.type(input, 'k');
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

    userEvent.clear(input);
  });

  it('render new content form page after change array of review', async () => {
    // changeStateCard.mockReturnValue(newReviewArr);
    // const arr = changeStateCard();
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <div className="form-page" data-testid="form-page">
    //           <Form />
    //           <div className="form-content" data-testid="form-content">
    //             {arr.map((el: IFormCard, i: React.Key | null | undefined) => (
    //               <FormCard key={i} card={el} />
    //             ))}
    //           </div>
    //         </div>
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });
    const initialState = {
      cardForm: newReviewArr,
    };

    renderWithProviders(<FormPage />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const formCard = screen.getAllByTestId('review-card');
    expect(formCard.length).toBe(3);
  });

  it('type valid all input', async () => {
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <Form />
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<Form />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const message = screen.queryByTestId('message-success');
    await expect(message).not.toHaveValue('Отзыв сохранен успешно!!!');

    const text = screen.getByTestId('name');
    const gender = screen.getAllByTestId('gender');
    const date = screen.getByTestId('birthday');
    const photo = screen.getByTestId('photo') as HTMLInputElement;
    const textarea = screen.getByTestId('textarea');
    const mark = screen.getByTestId('mark');
    const checkbox = screen.getByTestId('checkbox');

    const btnSubmit = screen.getByTestId('btn-submit');

    await act(async () => {
      await userEvent.type(text, 'kate');
      await userEvent.click(gender[0]);
      await fireEvent.change(date, { target: { value: '2010-11-01' } });
      const file = new File(['hello'], 'hello.png', { type: ' image/png' });
      await userEvent.upload(photo, file);
      Object.defineProperty(photo, 'value', { value: file.name });
      await userEvent.type(textarea, 'It is a good site!');
      await fireEvent.change(mark, { target: { value: '3' } });
      await userEvent.click(checkbox);
    });

    await act(async () => {
      await userEvent.click(btnSubmit);
    });

    expect(screen.queryByText('Отзыв сохранен успешно!!!')).toBeInTheDocument();

    await act(async () => {
      await jest.advanceTimersByTime(500);
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it('type invalid some inputs', async () => {
    // act(() => {
    //   render(
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <Form />
    //       </Provider>
    //     </BrowserRouter>
    //   );
    // });
    const initialState = {
      cardForm: reviewArr,
    };

    renderWithProviders(<Form />, {
      preloadedState: {
        formCard: initialState,
      },
    });

    const message = screen.queryByTestId('message-success');
    await expect(message).not.toHaveValue('Отзыв сохранен успешно!!!');

    const text = screen.getByTestId('name');
    const gender = screen.getAllByTestId('gender');
    const date = screen.getByTestId('birthday');
    const photo = screen.getByTestId('photo') as HTMLInputElement;
    const textarea = screen.getByTestId('textarea');
    const mark = screen.getByTestId('mark');
    const checkbox = screen.getByTestId('checkbox');

    const btnSubmit = screen.getByTestId('btn-submit');

    await act(async () => {
      await userEvent.type(text, 'kate1');
      await userEvent.click(gender[0]);
      await fireEvent.change(date, { target: { value: '2010-11-01' } });
      const file = new File(['hello'], 'hello.png', { type: ' image/png' });
      await userEvent.upload(photo, file);
      Object.defineProperty(photo, 'value', { value: file.name });
      await userEvent.type(textarea, 'It');
      await fireEvent.change(mark, { target: { value: '3' } });
      await userEvent.click(checkbox);
    });

    await act(async () => {
      await userEvent.click(btnSubmit);
    });

    expect(screen.queryByText('Отзыв сохранен успешно!!!')).not.toBeInTheDocument();
    expect(setTimeout).not.toHaveBeenCalled();
  });
});
