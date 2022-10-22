import { InputFormProps } from 'data/types';
import React from 'react';
import './CheckboxInput.css';

const CheckboxInput = ({ label, register, onChange }: InputFormProps) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        data-testid={'checkbox'}
        {...register(label, {
          required: 'Необходимо дать согласие на обработку персональных данных',
          onChange: () => onChange(),
        })}
      />
      <span className="checkbox__text">Согласен(на) на обработку персональных данных</span>
    </label>
  );
};

export { CheckboxInput };
