import { Form } from 'component/Form/Form';
import { FormCard } from 'component/FormCard/FormCard';
import { IFormCard } from 'data/interfaces';
import React, { useEffect, useState } from 'react';
import './FormPage.css';

export function FormPage() {
  const [card, setCard] = useState<IFormCard[]>(
    JSON.parse(localStorage.getItem('contentForm') as string) || ([] as IFormCard[])
  );

  useEffect(() => {
    return () => localStorage.setItem('contentForm', JSON.stringify(card));
  });

  function changeStateCard(arr: IFormCard): void {
    setCard([...card, arr]);
  }

  return (
    <div className="form-page" data-testid="form-page">
      <Form changeCards={changeStateCard} />
      <div className="form-content" data-testid="form-content">
        {card.map((el, i) => (
          <FormCard key={i} card={el} />
        ))}
      </div>
    </div>
  );
}
