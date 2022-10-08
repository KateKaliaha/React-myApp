import { InputProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './DateInput.css';

const DateInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <label>
      <p> Дата рождения:</p>
      <input
        className="date"
        type="date"
        data-testid={'date'}
        ref={ref}
        onChange={props.attr.changeInput}
      />
      <ErrorMessage>{props.attr.err as string}</ErrorMessage>
    </label>
  );
});

export { DateInput };
