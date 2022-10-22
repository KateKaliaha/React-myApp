import { InputFormProps } from 'data/types';
import React from 'react';
import './DateInput.css';

const DateInput = ({ label, register, onChange }: InputFormProps) => {
  function validateBirthdayDate(value: string): boolean {
    const minAgeUser = 7;
    const birthdayDate = value.split('-');
    const today = new Date();

    if (+today.getFullYear() - minAgeUser <= +birthdayDate[0]) {
      return false;
    }

    return true;
  }

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
          onChange: () => onChange(),
        })}
      />
    </label>
  );
};

export { DateInput };
