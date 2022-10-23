import { ButtonSubmit } from 'component/FormInputs/ButtonSubmit/ButtonSubmit';
import { CheckboxInput } from 'component/FormInputs/CheckboxInput/CheckboxInput';
import { DateInput } from 'component/FormInputs/DateInput/DateInput';
import { ErrorMessage } from 'component/FormInputs/ErrorMessage/ErrorMessage';
import { NameInput } from 'component/FormInputs/NameInput/NameInput';
import { FileInput } from 'component/FormInputs/FileInput/FileInput';
import { RadioInput } from 'component/FormInputs/RadioInput/RadioInput';
import { SelectInput } from 'component/FormInputs/SelectInput/SelectInput';
import { TextAreaInput } from 'component/FormInputs/TextAreaInput/TextAreaInput';
import { FormProps } from 'data/types';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import './Form.css';

export function Form({ changeCards }: FormProps) {
  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitted },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      birthday: '',
      photo: '',
      review: '',
      data: false,
      mark: '',
      gender: '',
    },
  });

  const [message, setMessage] = useState('');

  const handleRegistration = async (data: FieldValues) => {
    await setMessage('Отзыв сохранен успешно!!!');

    const dataCard = {
      name: data.name as string,
      birthday: data.birthday as string,
      photo: URL.createObjectURL((data.photo as unknown as FileList)[0]) as string,
      review: data.review as string,
      mark: data.mark as string,
      gender: data.gender as string,
      data: data.data as boolean,
    };

    setTimeout(() => {
      changeCards(dataCard);
      setMessage('');
      reset();
    }, 500);
  };

  return (
    <>
      <form className="form" data-testid={'form'} onSubmit={handleSubmit(handleRegistration)}>
        <NameInput label="name" register={register} errors={errors} submit={isSubmitted} required />
        <div className="custom-radio">
          <p>Выберите пол: </p>
          <RadioInput label="gender" register={register} value="male" required />
          <RadioInput label="gender" register={register} value="female" required />
          <ErrorMessage>
            {errors?.gender && isSubmitted ? (errors.gender.message as string) : ''}
          </ErrorMessage>
        </div>
        <DateInput
          label="birthday"
          register={register}
          errors={errors}
          submit={isSubmitted}
          required
        />
        <FileInput
          label="photo"
          register={register}
          required
          errors={errors}
          submit={isSubmitted}
        />
        <TextAreaInput
          label="review"
          register={register}
          required
          errors={errors}
          submit={isSubmitted}
        />
        <SelectInput
          label="mark"
          register={register}
          required
          errors={errors}
          submit={isSubmitted}
        />
        <CheckboxInput
          label="data"
          register={register}
          required
          errors={errors}
          submit={isSubmitted}
        />
        <ButtonSubmit submit={isSubmitted} firstChangeForm={isDirty} isValid={isValid} />
      </form>
      <div className="message-success" data-testid="message-success">
        {message}
      </div>
    </>
  );
}
