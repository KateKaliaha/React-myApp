import React, { Component } from 'react';
import './Form.css';

type FormProps = Record<string, unknown>;
type FormState = {
  disable: boolean;
  isValid: boolean;
  error: boolean;
  errors: Errors;
};

type Errors = {
  gender?: string;
  name?: string;
  surname?: string;
  birthday?: string;
  photo?: string;
};

class Form extends Component<FormProps, FormState> {
  name: React.RefObject<HTMLInputElement> | null;
  surname: React.RefObject<HTMLInputElement> | null;
  form: React.RefObject<HTMLFormElement> | null;
  birthday: React.RefObject<HTMLInputElement> | null;
  photo: React.RefObject<HTMLInputElement> | null;
  review: React.RefObject<HTMLTextAreaElement> | null;
  mark: React.RefObject<HTMLSelectElement> | null;
  data: React.RefObject<HTMLInputElement> | null;
  male: React.RefObject<HTMLInputElement> | null;
  female: React.RefObject<HTMLInputElement> | null;

  constructor(props: FormProps) {
    super(props);
    this.form = React.createRef();
    this.name = React.createRef();
    this.surname = React.createRef();
    this.birthday = React.createRef();
    this.photo = React.createRef();
    this.review = React.createRef();
    this.mark = React.createRef();
    this.data = React.createRef();
    this.male = React.createRef();
    this.female = React.createRef();
    this.state = {
      disable: true,
      isValid: true,
      error: true,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.unDisabledBtn = this.unDisabledBtn.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validateBirthdayDate = this.validateBirthdayDate.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      name: (this.name?.current as HTMLInputElement).value,
      surname: (this.surname?.current as HTMLInputElement).value,
      birthday: (this.birthday?.current as HTMLInputElement).value,
      photo: (this.photo?.current as HTMLInputElement).value,
      review: (this.review?.current as HTMLTextAreaElement).value,
      mark: (this.mark?.current as HTMLSelectElement).value,
      data: (this.data?.current as HTMLInputElement).checked,
      gender: (this.male?.current as HTMLInputElement).checked
        ? (this.male?.current as HTMLInputElement).value
        : (this.female?.current as HTMLInputElement).value,
    };
    await this.isValid();

    console.log(data);
  }

  unDisabledBtn() {
    if (this.state.disable) {
      this.setState({ disable: false });
    }
  }

  validateBirthdayDate(value: string) {
    const minAgeUser = 7;
    const birthdayDate = value.split('-');
    const today = new Date();
    if (+today.getFullYear() - minAgeUser <= +birthdayDate[0]) {
      return false;
    }
    return true;
  }

  isValid() {
    const errors: Record<string, string> = {};

    if ((this.name?.current as HTMLInputElement).value.length < 2) {
      errors.name = 'Имя должно содержать минимум 2 буквы';
      this.setState({ isValid: false, error: false, errors: errors });
      (this.name?.current as HTMLInputElement).value = '';
    } else if (!/^[a-zа-яё]+$/i.test((this.name?.current as HTMLInputElement).value)) {
      errors.name = 'Имя должно состоять только из букв';
      this.setState({ isValid: false, error: false, errors: errors });
      (this.name?.current as HTMLInputElement).value = '';
    } else {
      this.setState({ isValid: true, error: true, errors: errors });
    }

    if ((this.surname?.current as HTMLInputElement).value.length < 2) {
      errors.surname = 'Фамилия должна содержать минимум 2 буквы';
      this.setState({ isValid: false, error: false, errors: errors });
      (this.surname?.current as HTMLInputElement).value = '';
    } else if (!/^[a-zа-яё]+$/i.test((this.surname?.current as HTMLInputElement).value)) {
      errors.surname = 'Фамилия должна состоять только из букв';
      this.setState({ isValid: false, error: false, errors: errors });
      (this.surname?.current as HTMLInputElement).value = '';
    } else {
      this.setState({ isValid: true, error: true, errors: errors });
    }

    if (
      (this.male?.current as HTMLInputElement).checked === false &&
      (this.female?.current as HTMLInputElement).checked === false
    ) {
      errors.gender = 'Выберите пол';
      this.setState({ isValid: false, error: false, errors: errors });
    } else {
      this.setState({ isValid: true, error: true, errors: errors });
    }

    if ((this.birthday?.current as HTMLInputElement).value.length === 0) {
      errors.birthday = 'Введите дату рождения';
      this.setState({ isValid: false, error: false, errors: errors });
    } else if (!this.validateBirthdayDate((this.birthday?.current as HTMLInputElement).value)) {
      errors.birthday = 'Возраст должен быть больше 7';
      this.setState({ isValid: false, error: false, errors: errors });
    } else {
      this.setState({ isValid: true, error: true, errors: errors });
    }

    if ((this.photo?.current as HTMLInputElement).value.length === 0) {
      errors.photo = 'Загрузите фотографию';
      this.setState({ isValid: false, error: false, errors: errors });
    } else {
      this.setState({ isValid: true, error: true, errors: errors });
    }
    // this.setState({ errors: errors });
    // console.log(this.state, this.birthday);
  }

  render() {
    return (
      <form className="form" data-testid={'form'} ref={this.form} onSubmit={this.handleSubmit}>
        <label>
          <p> Имя:</p>
          <input
            className={
              this.state.errors.name?.length === 0 || this.state.errors.name === undefined
                ? 'input-form'
                : 'input-form-error'
            }
            type="text"
            placeholder="Введите имя"
            data-testid={'name'}
            ref={this.name}
            onChange={this.unDisabledBtn}
          />
          <div
            // className="error"
            className={this.state.errors.name?.length === 0 ? 'notVisible-error' : 'visible-error'}
          >
            {this.state.errors.name}
          </div>
        </label>

        <label>
          <p> Фамилия:</p>
          <input
            className="input-form"
            type="text"
            placeholder="Введите фамилию"
            data-testid={'surname'}
            ref={this.surname}
            onChange={this.unDisabledBtn}
          />
          <div
            className={
              this.state.errors.surname?.length === 0 ? 'notVisible-error' : 'visible-error'
            }
          >
            {this.state.errors.surname}
          </div>
        </label>

        <div className="custom-radio">
          <p>Выберите пол: </p>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            data-testid={'male'}
            ref={this.male}
            onChange={this.unDisabledBtn}
          />
          <label className="label-female" htmlFor="male">
            Мужчина
          </label>

          <input
            className="input-male"
            type="radio"
            name="gender"
            id="female"
            value="female"
            data-testid={'female'}
            ref={this.female}
            onChange={this.unDisabledBtn}
          />
          <label className="label-female" htmlFor="female">
            Женщина
          </label>
        </div>
        <div
          className={this.state.errors.gender?.length === 0 ? 'notVisible-error' : 'visible-error'}
        >
          {this.state.errors.gender}
        </div>
        <label>
          <p> Дата рождения:</p>
          <input
            className="date"
            type="date"
            data-testid={'date'}
            ref={this.birthday}
            onChange={this.unDisabledBtn}
          />
          <div
            className={
              this.state.errors.birthday?.length === 0 ? 'notVisible-error' : 'visible-error'
            }
          >
            {this.state.errors.birthday}
          </div>
        </label>

        <label>
          <p> Загрузите фотографию:</p>
          <input
            className="photo"
            type="file"
            data-testid={'photo'}
            ref={this.photo}
            onChange={this.unDisabledBtn}
          />
          <div
            className={this.state.errors.photo?.length === 0 ? 'notVisible-error' : 'visible-error'}
          >
            {this.state.errors.photo}
          </div>
        </label>

        <label>
          <p> Отзыв о сайте:</p>
          <textarea
            cols={50}
            rows={5}
            data-testid={'textarea'}
            className="textarea"
            ref={this.review}
            onChange={this.unDisabledBtn}
          />
          <div className="error" />
        </label>

        <label>
          <p> Ваша оценка: </p>
          <select
            className="select-form"
            data-testid={'mark'}
            ref={this.mark}
            onChange={this.unDisabledBtn}
          >
            <option value=""> </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="error" />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            data-testid={'checkbox'}
            ref={this.data}
            onChange={this.unDisabledBtn}
          />
          <span className="checkbox__text">Согласен(на) на обработку персональных данных</span>
          <div className="error">Error</div>
        </label>

        <button
          type={'submit'}
          className="submit"
          data-testid={'btn-submit'}
          disabled={this.state.disable}
        >
          Отправить
        </button>
      </form>
    );
  }
}

export { Form };
