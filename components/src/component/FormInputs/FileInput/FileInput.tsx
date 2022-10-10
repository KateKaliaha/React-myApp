import { InputProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const FileInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <label>
      <p> Загрузите фотографию:</p>
      <input
        className="photo"
        type="file"
        data-testid={'photo'}
        accept="image/*"
        name="photo"
        ref={ref}
        onChange={props.attr.changeInput}
      />
      <ErrorMessage>{props.attr.err as string}</ErrorMessage>
    </label>
  );
});

export { FileInput };
