import React from 'react';
import { InputFormProps } from 'data/types';

export const FileInput = ({ label, register, onChange }: InputFormProps) => {
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
          onChange: () => onChange(),
        })}
      />
    </label>
  );
};
