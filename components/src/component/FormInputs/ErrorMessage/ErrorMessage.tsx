import React from 'react';
import './ErrorMessage.css';

export function ErrorMessage(props: { children: string }): JSX.Element {
  return (
    <div className="error" data-testid="error">
      {props.children}
    </div>
  );
}
