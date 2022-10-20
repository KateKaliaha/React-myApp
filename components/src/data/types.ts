import { ICardApi, IFormCard } from './interfaces';

export type FormPageState = {
  card: IFormCard[];
};

export type FormCardState = {
  card: IFormCard;
};

export type FormPageProps = Record<string, unknown>;

export type FormCardProps = Record<string, IFormCard>;

export type FormProps = Record<string, (arr: IFormCard) => void>;

export type FormState = {
  message: string;
  firstChangeForm: boolean;
  submit: boolean;
  disable: boolean;
  errors: Errors;
};

export type Errors = {
  gender?: string;
  name?: string;
  surname?: string;
  birthday?: string;
  photo?: string;
  review?: string;
  mark?: string;
  data?: string;
};

export type InputProps = {
  attr: {
    changeInput?: React.ChangeEventHandler<HTMLInputElement>;
    changeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>;
    changeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
    err?: string;
    gender?: string;
    genderValue?: string;
    disabled?: boolean;
  };
};

export type BtnSubmitProps = Record<string, boolean>;

export type CardsState = {
  data: ICardApi[];
  modalActive: boolean;
  card: ICardApi | undefined;
  isFetching: boolean;
  value: string | null;
};

export type CardsProps = Record<string, unknown>;

export type ModalWindowProps = {
  active: boolean;
  movie: ICardApi;
  closeModalWindow: () => void;
};

export type ModalWindowState = {
  data: ICardApi[];
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
