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
  active: boolean;
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

export type SearchProps = Record<string, (value: string) => void>;

export type InputFormProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  // onChange: () => void;
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
