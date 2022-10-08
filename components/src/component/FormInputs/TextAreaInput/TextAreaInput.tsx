import { InputProps } from 'data/types';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './TextAreaInput.css';

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
  return (
    <label>
      <p> Отзыв о сайте:</p>
      <textarea
        data-testid={'textarea'}
        className="textarea"
        ref={ref}
        onChange={props.attr.changeTextArea}
      />
      <ErrorMessage>{props.attr.err as string}</ErrorMessage>
    </label>
  );
});

export { TextAreaInput };
