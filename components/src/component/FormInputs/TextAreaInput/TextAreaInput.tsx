import React from 'react';
import { InputFormProps } from 'data/types';
import './TextAreaInput.css';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const TextAreaInput = ({ label, register, onChange, errors, submit }: InputFormProps) => {
  return (
    <label>
      <p> Отзыв о сайте:</p>
      <textarea
        data-testid={'textarea'}
        className="textarea"
        {...register(label, {
          required: 'Напишите отзыв',
          minLength: {
            value: 10,
            message: 'Отзыв должен содержать минимум 10 символов',
          },
          onChange: () => onChange(),
        })}
      />
      <ErrorMessage>
        {errors?.review && submit ? (errors.review.message as string) : ''}
      </ErrorMessage>
    </label>
  );
};
