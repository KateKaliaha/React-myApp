import { IResponse } from 'data/interfaces';

const PATH_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru';

const PATH_DISCOVER =
  'https://api.themoviedb.org/3/discover/movie?api_key=9c5e0f16891cead9f73032e139a5c245&language=ru-Ru&primary_release_date.gte=2022-06-01&with_genres=28';

export async function getFetchDataSearch(page: number, value: string): Promise<IResponse> {
  const response = await fetch(`${PATH_SEARCH}&query=${value}&page=${page}`);
  const data = await response.json().then((value) => value);

  return data;
}

export async function getFetchDataDiscover(page: number, sortValue: string): Promise<IResponse> {
  let data;

  if (sortValue.length) {
    const response = await fetch(`${PATH_DISCOVER}&page=${page}&sort_by=${sortValue}`);
    data = await response.json().then((value) => value);
  } else {
    const response = await fetch(`${PATH_DISCOVER}&page=${page}`);
    data = await response.json().then((value) => value);
  }

  return data;
}
