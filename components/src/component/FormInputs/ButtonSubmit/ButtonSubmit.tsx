import { BtnSubmitProps } from 'data/types';
import React from 'react';
import './ButtonSubmit.css';

export const ButtonSubmit = ({ submit, firstChangeForm, isValid }: BtnSubmitProps): JSX.Element => {
  return (
    <input
      type="submit"
      className="submit"
      data-testid={'btn-submit'}
      disabled={(!submit && !firstChangeForm) || (!isValid && submit)}
    />
  );
};
