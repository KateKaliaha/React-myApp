import React from 'react';
import './RadioInput.css';
import { InputFormProps } from 'data/types';

export const RadioInput = ({ label, register, value }: InputFormProps) => {
  let nameGender;
  if (value === 'male') {
    nameGender = 'Мужчина';
  } else {
    nameGender = 'Женщина';
  }
  return (
    <>
      <input
        type="radio"
        id={value}
        value={value}
        data-testid={label}
        {...register(label, {
          required: 'Выберите пол',
        })}
      />
      <label className="label-female" htmlFor={value}>
        {nameGender}
      </label>
    </>
  );
};
