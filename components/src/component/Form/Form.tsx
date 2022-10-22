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
    formState: { errors, isValid, isDirty },
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
  const [submit, setSubmit] = useState(false);

  const handleError = async () => {
    if (submit === false) {
      await setSubmit(true);
    }
  };

  const handleRegistration = async (data: FieldValues) => {
    await setMessage('Отзыв сохранен успешно!!!');
    await setSubmit(false);

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
      <form
        className="form"
        data-testid={'form'}
        onSubmit={handleSubmit(handleRegistration, handleError)}
      >
        <NameInput label="name" register={register} errors={errors} submit={submit} required />
        <div className="custom-radio">
          <p>Выберите пол: </p>
          <RadioInput label="gender" register={register} value="male" required />
          <RadioInput label="gender" register={register} value="female" required />
          <ErrorMessage>
            {errors?.gender && submit ? (errors.gender.message as string) : ''}
          </ErrorMessage>
        </div>
        <DateInput label="birthday" register={register} errors={errors} submit={submit} required />
        <FileInput label="photo" register={register} required errors={errors} submit={submit} />
        <TextAreaInput
          label="review"
          register={register}
          required
          errors={errors}
          submit={submit}
        />
        <SelectInput label="mark" register={register} required errors={errors} submit={submit} />
        <CheckboxInput label="data" register={register} required errors={errors} submit={submit} />
        <ButtonSubmit submit={submit} firstChangeForm={isDirty} isValid={isValid} />
      </form>
      <div className="message-success">{message}</div>
    </>
  );
}
