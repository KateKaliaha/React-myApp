import { InputFormProps } from 'data/types';
import React from 'react';
import './SelectInput.css';

export const SelectInput = ({ label, register, onChange }: InputFormProps) => {
  return (
    <label>
      <p> Ваша оценка: </p>
      <select
        className="select-form"
        data-testid={label}
        {...register(label, {
          required: 'Выберите оценку',
          onChange: () => onChange(),
        })}
      >
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
  );
};
