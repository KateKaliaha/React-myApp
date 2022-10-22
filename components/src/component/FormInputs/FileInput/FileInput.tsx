import React from 'react';
import { InputFormProps } from 'data/types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const FileInput = ({ label, register, errors, submit }: InputFormProps) => {
  return (
    <label>
      <p> Загрузите фотографию:</p>
      <input
        className="photo"
        type="file"
        data-testid={'photo'}
        accept="image/*"
        {...register(label, {
          required: 'Загрузите фотографию',
        })}
      />
      <ErrorMessage>{errors?.photo && submit ? (errors.photo.message as string) : ''}</ErrorMessage>
    </label>
  );
};
