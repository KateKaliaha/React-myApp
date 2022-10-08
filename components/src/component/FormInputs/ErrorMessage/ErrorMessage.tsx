import React from 'react';
import './ErrorMessage.css';

export function ErrorMessage(props: { children: string }) {
  return <div className="error">{props.children}</div>;
}
