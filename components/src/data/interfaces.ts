export interface IFormCard {
  name: string;
  birthday: string;
  photo: string;
  review: string;
  mark: string;
  data: boolean;
  gender: string;
}

export interface ICardApi {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICardProps {
  movie: ICardApi;
}

export interface IFormCardProps {
  card: IFormCard;
}

export interface IResponse {
  page: number;
  results: ICardApi[];
  total_pages: number;
  total_results: number;
}
