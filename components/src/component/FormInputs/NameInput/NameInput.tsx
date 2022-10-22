import React from 'react';
import './NameInput.css';
import { InputFormProps } from 'data/types';

const NameInput = ({ label, register, onChange }: InputFormProps) => {
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
          onChange: () => onChange(),
        })}
      />
    </label>
  );
};

export { NameInput };
