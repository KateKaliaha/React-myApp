import { ButtonSubmit } from 'component/FormInputs/ButtonSubmit/ButtonSubmit';
import { CheckboxInput } from 'component/FormInputs/CheckboxInput/CheckboxInput';
import { DateInput } from 'component/FormInputs/DateInput/DateInput';
import { ErrorMessage } from 'component/FormInputs/ErrorMessage/ErrorMessage';
import { FileInput } from 'component/FormInputs/FileInput/FileInput';
import { NameInput } from 'component/FormInputs/NameInput/NameInput';
import { RadioInput } from 'component/FormInputs/RadioInput/RadioInput';
import { SelectInput } from 'component/FormInputs/SelectInput/SelectInput';
import { TextAreaInput } from 'component/FormInputs/TextAreaInput/TextAreaInput';
import { FormProps, FormState } from 'data/types';
import React, { Component } from 'react';
import './Form.css';

class Form extends Component<FormProps, FormState> {
  name: React.RefObject<HTMLInputElement> | null;
  birthday: React.RefObject<HTMLInputElement> | null;
  photo: React.RefObject<HTMLInputElement> | null;
  review: React.RefObject<HTMLTextAreaElement> | null;
  mark: React.RefObject<HTMLSelectElement> | null;
  data: React.RefObject<HTMLInputElement> | null;
  male: React.RefObject<HTMLInputElement> | null;
  female: React.RefObject<HTMLInputElement> | null;

  constructor(props: FormProps) {
    super(props);
    this.name = React.createRef();
    this.birthday = React.createRef();
    this.photo = React.createRef();
    this.review = React.createRef();
    this.mark = React.createRef();
    this.data = React.createRef();
    this.male = React.createRef();
    this.female = React.createRef();
    this.state = {
      disable: true,
      errors: {
        gender: '',
        name: '',
        birthday: '',
        photo: '',
        review: '',
        mark: '',
        data: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.unDisabledBtn = this.unDisabledBtn.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await this.isValid();
    if (
      this.state.errors.birthday?.length === 0 &&
      this.state.errors.data?.length === 0 &&
      this.state.errors.gender?.length === 0 &&
      this.state.errors.mark?.length === 0 &&
      this.state.errors.name?.length === 0 &&
      this.state.errors.photo?.length === 0 &&
      this.state.errors.review?.length === 0
    ) {
      const files = (this.photo?.current as HTMLInputElement).files as FileList;
      const data = {
        name: (this.name?.current as HTMLInputElement).value,
        birthday: (this.birthday?.current as HTMLInputElement).value,
        photo: URL.createObjectURL(files[0]),
        review: (this.review?.current as HTMLTextAreaElement).value,
        mark: (this.mark?.current as HTMLSelectElement).value,
        data: (this.data?.current as HTMLInputElement).checked,
        gender: (this.male?.current as HTMLInputElement).checked
          ? (this.male?.current as HTMLInputElement).value
          : (this.female?.current as HTMLInputElement).value,
      };

      this.props.changeCards(data);
      this.resetFormData(event);
    }
  }

  unDisabledBtn() {
    if (this.state.disable) {
      this.setState({ disable: false });
    }
  }

  resetFormData(event: React.FormEvent<HTMLFormElement>) {
    (event.target as HTMLFormElement).reset();
    this.setState({ disable: true });
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

  validateBirthdayInput(errors: Record<string, string>) {
    let birthdayInput = (this.birthday?.current as HTMLInputElement).value;
    if (birthdayInput.length === 0) {
      errors.birthday = 'Введите дату рождения';
      birthdayInput = '';
    } else if (!this.validateBirthdayDate(birthdayInput)) {
      errors.birthday = 'Возраст должен быть больше 7 лет';
      birthdayInput = '';
    } else {
      errors.birthday = '';
    }
    this.setState({ errors: errors });
  }

  validateInputName(errors: Record<string, string>) {
    let nameInput = (this.name?.current as HTMLInputElement).value;
    const minLettersInWord = 2;
    if (nameInput.length < minLettersInWord) {
      errors.name = 'Имя должно содержать минимум 2 буквы';
      nameInput = '';
    } else if (!/^[a-zа-яё]+$/i.test(nameInput)) {
      errors.name = 'Имя должно состоять только из букв';
      nameInput = '';
    } else {
      errors.name = '';
    }
    this.setState({ errors: errors });
  }

  validateGenderInput(errors: Record<string, string>) {
    if (
      (this.male?.current as HTMLInputElement).checked === false &&
      (this.female?.current as HTMLInputElement).checked === false
    ) {
      errors.gender = 'Выберите пол';
    } else {
      errors.gender = '';
    }
    this.setState({ errors: errors });
  }

  validatePhotoInput(errors: Record<string, string>) {
    if ((this.photo?.current as HTMLInputElement).value.length === 0) {
      errors.photo = 'Загрузите фотографию';
      (this.photo?.current as HTMLInputElement).value = '';
    } else {
      errors.photo = '';
    }
    this.setState({ errors: errors });
  }

  validateReviewInput(errors: Record<string, string>) {
    let reviewInput = (this.review?.current as HTMLTextAreaElement).value;
    const minNumberSymbols = 10;
    if (reviewInput.length < minNumberSymbols) {
      errors.review = 'Отзыв должен содержать минимум 10 символов';
      reviewInput = '';
    } else {
      errors.review = '';
    }
    this.setState({ errors: errors });
  }

  validateMarkInput(errors: Record<string, string>) {
    if ((this.mark?.current as HTMLSelectElement).value === '') {
      errors.mark = 'Выберите оценку';
    } else {
      errors.mark = '';
    }
    this.setState({ errors: errors });
  }

  validateDataCheckbox(errors: Record<string, string>) {
    if ((this.data?.current as HTMLInputElement).checked === false) {
      errors.data = 'Необходимо дать согласие на обработку персональных данных';
    } else {
      errors.data = '';
    }
    this.setState({ errors: errors });
  }

  isValid() {
    const errors: Record<string, string> = {};

    this.validateInputName(errors);
    this.validateGenderInput(errors);
    this.validateBirthdayInput(errors);
    this.validatePhotoInput(errors);
    this.validateReviewInput(errors);
    this.validateMarkInput(errors);
    this.validateDataCheckbox(errors);
  }

  render() {
    return (
      <form className="form" data-testid={'form'} onSubmit={this.handleSubmit}>
        <NameInput
          attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.name as string }}
          ref={this.name}
        />
        <div className="custom-radio">
          <p>Выберите пол: </p>
          <RadioInput
            attr={{
              changeInput: this.unDisabledBtn,
              err: this.state.errors.gender as string,
              gender: 'Мужчина',
              genderValue: 'male',
            }}
            ref={this.male}
          />
          <RadioInput
            attr={{
              changeInput: this.unDisabledBtn,
              err: this.state.errors.gender as string,
              gender: 'Женщина',
              genderValue: 'female',
            }}
            ref={this.female}
          />
          <ErrorMessage>{this.state.errors.gender as string}</ErrorMessage>
        </div>
        <DateInput
          attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.birthday as string }}
          ref={this.birthday}
        />
        <FileInput
          attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.photo as string }}
          ref={this.photo}
        />
        <TextAreaInput
          attr={{ changeTextArea: this.unDisabledBtn, err: this.state.errors.review as string }}
          ref={this.review}
        />
        <SelectInput
          attr={{ changeSelect: this.unDisabledBtn, err: this.state.errors.mark as string }}
          ref={this.mark}
        />
        <CheckboxInput
          attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.data as string }}
          ref={this.data}
        />
        <ButtonSubmit disabled={this.state.disable} />
      </form>
    );
  }
}

export { Form };
