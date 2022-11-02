import { Dispatch } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { ICardApi, IFormCard, IFormValues } from './interfaces';

export type FormCardProps = Record<string, IFormCard>;

export type BtnSubmitProps = Record<string, boolean>;

export type PopularContentProps = {
  names: string[];
  movie: ICardApi;
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

export type Action = {
  type: string;
  payload: string | ICardApi[] | null | number | ICardApi | boolean | IFormCard[];
};

export type ReducerState = {
  cardForm: IFormCard[];
};

export type ReducerContextValue = {
  state: ReducerState;
  dispatch: Dispatch<Action>;
};
