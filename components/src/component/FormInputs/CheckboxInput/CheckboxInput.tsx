import { InputProps } from 'data/types';
import React from 'react';
import './CheckboxInput.css';

const CheckboxInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name="data"
        data-testid={'checkbox'}
        ref={ref}
        onChange={props.attr.changeInput}
      />
      <span className="checkbox__text">Согласен(на) на обработку персональных данных</span>
      <div className="error">{props.attr.err}</div>
    </label>
  );
});

export { CheckboxInput };
