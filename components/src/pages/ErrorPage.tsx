import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <div className="error-page">
        <div className="error-number">404</div>
        <div className="error-text">
          Страница не найдена. Вернитесь на <Link to="/">главную</Link> страницу.
        </div>
      </div>
    </>
  );
}
export { ErrorPage };
