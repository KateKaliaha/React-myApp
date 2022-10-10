import { Form } from 'component/Form/Form';
import { FormCard } from 'component/FormCard/FormCard';
import { IFormCard } from 'data/interfaces';
import { FormPageProps, FormPageState } from 'data/types';
import React, { Component } from 'react';
import './FormPage.css';

class FormPage extends Component<FormPageProps, FormPageState> {
  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      card: JSON.parse(localStorage.getItem('contentForm') as string) || ([] as IFormCard[]),
    };
    this.changeStateCard = this.changeStateCard.bind(this);
  }

  changeStateCard(arr: IFormCard): void {
    this.setState({ card: [...this.state.card, arr] });
  }

  componentWillUnmount(): void {
    localStorage.setItem('contentForm', JSON.stringify(this.state.card));
  }

  render(): JSX.Element {
    return (
      <div className="form-page" data-testid="form-page">
        <Form changeCards={this.changeStateCard} />
        <div className="form-content" data-testid="form-content">
          {this.state.card.map((el, i) => (
            <FormCard key={i} card={el} />
          ))}
        </div>
      </div>
    );
  }
}

export { FormPage };
