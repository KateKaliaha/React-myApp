import { IFormCardProps } from 'data/interfaces';
import React from 'react';
import { FaFemale, FaMale, FaStar } from 'react-icons/fa';
import './FormCard.css';

function FormCard({ card }: IFormCardProps): JSX.Element {
  const birthday = card.birthday.split('-').reverse().join('.');
  return (
    <div className="review-card" data-testid="review-card">
      <img className="review-img" src={card.photo} alt="User avatar" />
      <div className="review-person" data-testid="review-person">
        {card.gender === 'male' ? <FaMale /> : <FaFemale />} {card.name}
      </div>
      <div>Дата рождения: {birthday}</div>
      <div className="review-mark">
        {card.mark}
        {<FaStar />}
      </div>
      <div className="review">Отзыв: {card.review}</div>
    </div>
  );
}

export { FormCard };
