import React, { Component } from 'react';
import './Form.css';

type FormProps = Record<string, unknown>;
type FormState = {
  disable: boolean;
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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.unDisabledBtn = this.unDisabledBtn.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    console.log(data, this.state.disable);
  }

  unDisabledBtn() {
    if (this.state.disable) {
      this.setState({ disable: false });
    }
    // this.isValid();
  }

  isValid(event: React.SyntheticEvent<HTMLInputElement>) {
    console.log(event.currentTarget);
  }

  render() {
    return (
      <form className="form" data-testid={'form'} ref={this.form} onSubmit={this.handleSubmit}>
        <label>
          <p> Имя:</p>
          <input
            className="input-form"
            type="text"
            placeholder="Введите имя"
            data-testid={'name'}
            ref={this.name}
            onChange={this.unDisabledBtn}
          />
          <div className="error">Error</div>
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
          <div className="error">Error</div>
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
        <div className="error" />
        <label>
          <p> Дата рождения:</p>
          <input
            className="date"
            type="date"
            data-testid={'date'}
            ref={this.birthday}
            onChange={this.unDisabledBtn}
          />
          <div className="error" />
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
          <div className="error" />
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
