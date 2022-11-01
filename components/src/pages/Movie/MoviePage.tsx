import { PopularContent } from 'component/UI/PopularContent/PopularContent';
import DataContext, { ACTION } from 'context/DataContext';
import { ICardApi } from 'data/interfaces';
import React, { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './MoviePage.css';

export const PathToNotFoundImage =
  'data:image/png;base64,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';

export function MoviePage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  function goBack() {
    return navigate(-1);
  }

  const { state, dispatch } = useContext(DataContext);
  const movie = state.data.find((item) => item.id === +id!) as ICardApi;

  let imgSRC = '';

  const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
  if (state.data.length) {
    if (movie.poster_path === null) {
      imgSRC = PathToNotFoundImage;
    } else {
      imgSRC = `${IMG_PATH + movie.poster_path}`;
    }
  }

  const nameClasses = ['movie-rate-container', 'movie-like-container'];

  return (
    <>
      {!state.data.length ? (
        <Navigate to={'/movie'} replace />
      ) : (
        <div className="movie-content-wrapper">
          <h1>Фильм: {movie.title}</h1>
          <div className="movie-content">
            <div className="movie-header-wrapper">
              <img className="movie-card-img" src={imgSRC} data-testid="movie-img-card"></img>
              <div className="movie-header-content">
                <p className="movie-name">{movie.title}</p>
                <PopularContent names={nameClasses} movie={movie} />
              </div>
            </div>

            <div className="movie-content-overview">{movie.overview}</div>
            <div className="movie-content-description">
              <p>Оригинальное название: {movie.original_title}</p>
              <p>Оригинальный язык: {movie.original_language}</p>
              <p>Дата релиза: {movie.release_date}</p>
              <p>Возраст просмотра: {movie.adult ? 'c 18 лет' : 'c 5 лет'}</p>
            </div>
          </div>
          <button
            data-testid="link-back"
            className="link-back"
            onClick={() => {
              dispatch({ type: ACTION.DISPLAY_STYLE, payload: 'flex' });
              goBack();
            }}
          >
            Вернуться на главную страницу
          </button>
        </div>
      )}
    </>
  );
}
