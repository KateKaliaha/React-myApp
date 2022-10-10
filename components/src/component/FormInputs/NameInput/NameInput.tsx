import { InputProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './NameInput.css';

const NameInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <label>
      <p>Имя:</p>
      <input
        className="input-form"
        type="text"
        placeholder="Введите имя"
        data-testid={'name'}
        name="name"
        ref={ref}
        onChange={props.attr.changeInput}
      />
      <ErrorMessage>{props.attr.err as string}</ErrorMessage>
    </label>
  );
});

export { NameInput };
