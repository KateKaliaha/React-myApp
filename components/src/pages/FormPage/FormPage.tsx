import { Form } from 'component/Form/Form';
import { FormCard } from 'component/FormCard/FormCard';
import DataContext from 'context/DataContext';
import React, { useContext } from 'react';
import './FormPage.css';

export function FormPage(): JSX.Element {
  const { state } = useContext(DataContext);

  return (
    <div className="form-page" data-testid="form-page">
      <Form />
      <div className="form-content" data-testid="form-content">
        {state.cardForm.map((el, i) => (
          <FormCard key={i} card={el} />
        ))}
      </div>
    </div>
  );
}
