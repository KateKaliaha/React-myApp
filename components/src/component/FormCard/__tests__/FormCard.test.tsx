import { render, screen } from '@testing-library/react';
import { reviewArr } from 'component/Form/Form.test';
import React from 'react';
import { FormCard } from '../FormCard';

describe('FormCard', () => {
  it('render with card', () => {
    render(<FormCard card={reviewArr[0]} />);

    expect(screen.getByTestId('review-card')).toBeInTheDocument();
    expect(screen.queryByText(/Denis/i)).toBeInTheDocument();
  });
});
