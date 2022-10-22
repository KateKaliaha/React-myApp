import React from 'react';
import './RadioInput.css';
import { InputFormProps } from 'data/types';

export const RadioInput = ({ label, register, onChange, value }: InputFormProps) => {
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
          onChange: () => onChange(),
        })}
      />
      <label className="label-female" htmlFor={value}>
        {nameGender}
      </label>
    </>
  );
};
