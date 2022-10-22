import { InputFormProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './DateInput.css';

export function validateBirthdayDate(value: string): boolean {
  const minAgeUser = 7;
  const birthdayDate = value.split('-');
  const today = new Date();

  if (+today.getFullYear() - minAgeUser <= +birthdayDate[0]) {
    return false;
  }

  return true;
}

export const DateInput = ({ label, register, errors, submit }: InputFormProps) => {
  return (
    <label>
      <p> Дата рождения:</p>
      <input
        className="date"
        type="date"
        data-testid={label}
        {...register(label, {
          required: 'Введите дату рождения',
          validate: {
            value: (value) => validateBirthdayDate(value as string),
          },
        })}
      />
      <ErrorMessage>
        {errors?.birthday && submit
          ? (errors.birthday.message as string) || 'Возраст должен быть больше 7 лет'
          : ''}
      </ErrorMessage>
    </label>
  );
};
