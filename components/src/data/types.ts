import { Path, UseFormRegister } from 'react-hook-form';
import { ICardApi, IFormCard, IFormValues } from './interfaces';

export type FormCardState = {
  card: IFormCard;
};

export type FormCardProps = Record<string, IFormCard>;

export type FormProps = Record<string, (arr: IFormCard) => void>;

export type BtnSubmitProps = Record<string, boolean>;

export type CardsProps = Record<string, unknown>;

export type ModalWindowProps = {
  movie: ICardApi;
  closeModalWindow: () => void;
};

export type PopularContentProps = {
  names: string[];
  movie: ICardApi;
};

export type CardListProps = {
  data: ICardApi[];
  openModalWindow: (event: React.MouseEvent<Element, MouseEvent>) => void;
};

export type SearchProps = {
  onKeyDown: (value: string, page?: number) => void;
  onChange: (event: React.FormEvent) => void;
  value: string | null;
  page?: number;
};

export type InputFormProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  value?: string;
  errors?: ErrorsValidation;
  submit?: boolean;
};

export type ErrorsValidation = {
  name?: ErrorMessage;
  birthday?: ErrorMessage;
  photo?: ErrorMessage;
  review?: ErrorMessage;
  mark?: ErrorMessage;
  data?: ErrorMessage;
};

type ErrorMessage = {
  message?: string;
};

export type SelectSortProps = {
  sort: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
};

export type PagesProps = {
  pages: number[];
  page: number;
  onClick: (btnNumber: number) => Promise<void>;
  countMovieOnPage: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
};
