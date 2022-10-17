import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('localStorage', () => {
  const localStorageMock = (function () {
    let store: Record<string, string> = {};

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('data is added into local storage', () => {
    const mockId = 'input';
    const mockJson = 'abcd';
    window.localStorage.setItem(mockId, mockJson);
    expect(window.localStorage.getItem(mockId)).toEqual(mockJson);
  });

  it('data in local storage which is overwritten', () => {
    const mockId = 'input';
    const mockOldData = 'abcd';
    const mockNewData = 'new letters';

    window.localStorage.setItem(mockId, mockOldData);
    expect(window.localStorage.getItem(mockId)).toEqual(mockOldData);

    window.localStorage.setItem(mockId, mockNewData);
    expect(window.localStorage.getItem(mockId)).toEqual(mockNewData);
  });

  it('only one input is in localStorage', () => {
    const mockId = 'input';
    const mockOldData = 'abcd';
    const mockNewData = 'new letters';

    window.localStorage.setItem(mockId, mockOldData);
    window.localStorage.setItem(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});

describe('Search and localstorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('input value after change pages', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkMain = screen.getByText(/Главная/i);
    userEvent.click(linkMain);
    expect(screen.getByPlaceholderText(/Поиск.../i)).toBeInTheDocument;
    userEvent.type(screen.getByPlaceholderText(/Поиск.../i), '456');
    expect(screen.getByPlaceholderText(/Поиск.../i)).toBeInTheDocument;
    const linkAbout = screen.getByText(/О нас/i);
    userEvent.click(linkAbout);

    expect(screen.findByPlaceholderText(/Поиск.../i)).not.toBeInTheDocument;

    userEvent.click(linkMain);
    expect(screen.getByPlaceholderText(/Поиск.../i)).toHaveValue('456');
    expect(window.localStorage.getItem('value')).toEqual('456');
  });
});
