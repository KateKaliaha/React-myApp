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
  male: React.RefObject<HTMLInputElement> | null;
  female: React.RefObject<HTMLInputElement> | null;
  form: React.RefObject<HTMLFormElement>;

  constructor(props: FormProps) {
    super(props);
    this.form = React.createRef<HTMLFormElement>();
    this.male = React.createRef();
    this.female = React.createRef();
    this.state = {
      message: '',
      firstChangeForm: false,
      submit: false,
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

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (this.state.submit === false) {
      this.setState({ submit: true });
    }

    await this.isValid();
    await this.unDisabledBtn();

    if (
      this.state.errors.birthday?.length === 0 &&
      this.state.errors.data?.length === 0 &&
      this.state.errors.gender?.length === 0 &&
      this.state.errors.mark?.length === 0 &&
      this.state.errors.name?.length === 0 &&
      this.state.errors.photo?.length === 0 &&
      this.state.errors.review?.length === 0
    ) {
      const data = {
        name: (this.form.current!.name as unknown as HTMLInputElement).value,
        birthday: (this.form.current!.date as unknown as HTMLInputElement).value,
        photo: URL.createObjectURL(
          ((this.form.current!.photo as unknown as HTMLInputElement).files as FileList)[0]
        ),
        review: (this.form.current!.textarea as unknown as HTMLTextAreaElement).value,
        mark: (this.form.current!.mark as unknown as HTMLSelectElement).value,
        data: (this.form.current!.data as unknown as HTMLInputElement).checked,
        gender: (this.form.current!.gender as unknown as HTMLInputElement).value,
      };

      this.setState({ message: 'Отзыв сохранен успешно!!!' });
      setTimeout(() => {
        this.props.changeCards(data);
        this.resetFormData(event);
        this.setState({ message: '', submit: false, firstChangeForm: false });
      }, 500);
    }
  }

  async unDisabledBtn(): Promise<void> {
    if (this.state.firstChangeForm === false && this.state.submit === false) {
      this.setState({ disable: false, firstChangeForm: true });
    } else if (this.state.submit === true) {
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
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    }
  }

  resetFormData(event: React.FormEvent<HTMLFormElement>): void {
    (event.target as HTMLFormElement).reset();
    (this.male?.current as HTMLInputElement).checked = false;
    (this.female?.current as HTMLInputElement).checked = false;
    (this.form.current!.data as unknown as HTMLInputElement).checked = false;
    this.setState({ disable: true });
  }

  validateBirthdayDate(value: string): boolean {
    const minAgeUser = 7;
    const birthdayDate = value.split('-');
    const today = new Date();
    if (+today.getFullYear() - minAgeUser <= +birthdayDate[0]) {
      return false;
    }
    return true;
  }

  validateBirthdayInput(errors: Record<string, string>): void {
    let birthdayInput = (this.form.current!.date as unknown as HTMLInputElement).value;
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

  validateInputName(errors: Record<string, string>): void {
    let nameInput = (this.form.current!.name as unknown as HTMLInputElement).value;
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

  validateGenderInput(errors: Record<string, string>): void {
    if ((this.form.current!.gender as unknown as HTMLInputElement).value === '') {
      errors.gender = 'Выберите пол';
    } else {
      errors.gender = '';
    }
    this.setState({ errors: errors });
  }

  validatePhotoInput(errors: Record<string, string>): void {
    if ((this.form.current!.photo as unknown as HTMLInputElement).value.length === 0) {
      errors.photo = 'Загрузите фотографию';
    } else {
      errors.photo = '';
    }
    this.setState({ errors: errors });
  }

  validateReviewInput(errors: Record<string, string>) {
    let reviewInput = (this.form.current!.textarea as unknown as HTMLTextAreaElement).value;
    const minNumberSymbols = 10;
    if (reviewInput.length < minNumberSymbols) {
      errors.review = 'Отзыв должен содержать минимум 10 символов';
      reviewInput = '';
    } else {
      errors.review = '';
    }
    this.setState({ errors: errors });
  }

  validateMarkInput(errors: Record<string, string>): void {
    if ((this.form.current!.mark as unknown as HTMLSelectElement).value === '') {
      errors.mark = 'Выберите оценку';
    } else {
      errors.mark = '';
    }
    this.setState({ errors: errors });
  }

  validateDataCheckbox(errors: Record<string, string>): void {
    if ((this.form.current!.data as unknown as HTMLInputElement).checked === false) {
      errors.data = 'Необходимо дать согласие на обработку персональных данных';
    } else {
      errors.data = '';
    }
    this.setState({ errors: errors });
  }

  isValid(): void {
    const errors: Record<string, string> = {};

    this.validateInputName(errors);
    this.validateGenderInput(errors);
    this.validateBirthdayInput(errors);
    this.validatePhotoInput(errors);
    this.validateReviewInput(errors);
    this.validateMarkInput(errors);
    this.validateDataCheckbox(errors);
  }

  render(): JSX.Element {
    return (
      <>
        <form className="form" data-testid={'form'} onSubmit={this.handleSubmit} ref={this.form}>
          <NameInput
            attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.name as string }}
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
          />
          <FileInput
            attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.photo as string }}
          />
          <TextAreaInput
            attr={{ changeTextArea: this.unDisabledBtn, err: this.state.errors.review as string }}
          />
          <SelectInput
            attr={{ changeSelect: this.unDisabledBtn, err: this.state.errors.mark as string }}
          />
          <CheckboxInput
            attr={{ changeInput: this.unDisabledBtn, err: this.state.errors.data as string }}
          />
          <ButtonSubmit disabled={this.state.disable} />
        </form>
        <div className="message-success">{this.state.message}</div>
      </>
    );
  }
}

export { Form };
