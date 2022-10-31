import { InputFormProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './CheckboxInput.css';

export const CheckboxInput = ({ label, register, errors, submit }: InputFormProps): JSX.Element => {
  return (
    <>
      <label className="checkbox">
        <input
          type="checkbox"
          data-testid={'checkbox'}
          {...register(label, {
            required: 'Необходимо дать согласие на обработку персональных данных',
          })}
        />
        <span className="checkbox__text">Согласен(на) на обработку персональных данных</span>
      </label>
      <ErrorMessage>{errors?.data && submit ? (errors.data.message as string) : ''}</ErrorMessage>
    </>
  );
};
