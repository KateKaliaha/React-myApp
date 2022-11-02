import { Form } from 'component/Form/Form';
import { FormCard } from 'component/FormCard/FormCard';
import { useAppSelector } from '../../hook';
import React from 'react';
import './FormPage.css';

export function FormPage(): JSX.Element {
  const cardForm = useAppSelector((state) => state.formCard.cardForm);

  return (
    <div className="form-page" data-testid="form-page">
      <Form />
      <div className="form-content" data-testid="form-content">
        {cardForm.map((el, i) => (
          <FormCard key={i} card={el} />
        ))}
      </div>
    </div>
  );
}
