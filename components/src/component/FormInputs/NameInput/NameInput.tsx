import React from 'react';
import './NameInput.css';
import { InputFormProps } from 'data/types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const NameInput = ({ label, register, errors, submit }: InputFormProps) => {
  return (
    <label>
      <p>Имя:</p>
      <input
        className="input-form"
        type="text"
        placeholder="Введите имя"
        data-testid={'name'}
        {...register(label, {
          required: 'Поле обязательно к заполнению',
          minLength: {
            value: 2,
            message: 'Имя должно содержать минимум 2 буквы',
          },
          pattern: {
            value: /^[a-zа-яё]+$/i,
            message: 'Имя должно состоять только из букв',
          },
        })}
      />
      <ErrorMessage>{errors?.name && submit ? (errors.name.message as string) : ''}</ErrorMessage>
    </label>
  );
};
