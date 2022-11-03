import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { CardList } from '../CardList';

describe('CardList', () => {
  afterEach(cleanup);

  it('snapshot CardList container', async () => {
    const { container } = render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('click on card', async () => {
    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );
    const card = screen.queryAllByTestId('card');
    await act(async () => await userEvent.click(card[0]));
  });
});
