import { InputProps } from 'data/types';
import React from 'react';
import './RadioInput.css';

const RadioInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <input
        type="radio"
        name="gender"
        id={props.attr.genderValue}
        value={props.attr.genderValue}
        data-testid={props.attr.genderValue}
        ref={ref}
        onChange={props.attr.changeInput}
      />
      <label className="label-female" htmlFor={props.attr.genderValue}>
        {props.attr.gender}
      </label>
    </>
  );
});

export { RadioInput };
