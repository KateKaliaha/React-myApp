import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename="/katekaliaha-REACT2022Q3">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
