import { InputProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './SelectInput.css';

const SelectInput = React.forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  return (
    <label>
      <p> Ваша оценка: </p>
      <select
        className="select-form"
        data-testid={'mark'}
        ref={ref}
        onChange={props.attr.changeSelect}
      >
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <ErrorMessage>{props.attr.err as string}</ErrorMessage>
    </label>
  );
});

export { SelectInput };
